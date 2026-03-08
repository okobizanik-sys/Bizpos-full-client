"use server";

import { deleteProduct, updateProduct } from "@/services/product";
import { filenameGenerator } from "@/utils/helpers";
import { processImage, saveImageBufferToFile } from "@/lib/sharp";
import { logger } from "@/lib/winston";
import { revalidatePath } from "next/cache";
import db from "@/db/database";

export async function updateProductFormAction(id: number, formData: FormData) {
  await db.transaction(async (trx) => {
    const data = {
      files: formData.getAll("files") as File[],
      name: formData.get("name") as string,
      sellingPrice: Number(formData.get("sellingPrice")),
      categoryId: Number(formData.get("categoryId")),
      brandId: formData.get("brandId")
        ? Number(formData.get("brandId")) || null
        : null,
      colorIds: formData.getAll("colorIds"),
      sizeIds: formData.getAll("sizeIds"),
      sku: formData.get("sku") as string,
      // DB column is varchar(255), so keep payload within the limit.
      description: ((formData.get("description") as string) || "").slice(
        0,
        255
      ),
    };

    // console.log(data, "data from update product actionF");

    let imageId: number | undefined = undefined;
    const galleryImageIds: number[] = [];

    if (data.files.length > 0) {
      for (const file of data.files) {
        const processedFile = await processImage(file, 400, 400);
        const filename = filenameGenerator(
          file.name,
          "product",
          "/images/products"
        );
        await saveImageBufferToFile(processedFile, filename);
        logger.info(`File uploaded successfully: ${filename}`);

        const [insertImageResult] = await trx("images").insert({
          url: filename,
        });

        const [image] = await trx("images").where({ id: insertImageResult });
        galleryImageIds.push(image.id);
      }

      imageId = galleryImageIds[0];
    }

    const updateData: {
      name: string;
      selling_price: number;
      sku: string;
      description: string;
      category_id: number;
      brand_id: number | null;
      image_id?: number;
    } = {
      name: data.name,
      selling_price: data.sellingPrice,
      sku: data.sku,
      description: data.description,
      category_id: data.categoryId,
      brand_id: data.brandId,
    };

    if (typeof imageId === "number") {
      updateData.image_id = imageId;
    }

    const product = await updateProduct(
      {
        where: { id },
        data: updateData,
      },
      trx
    );

    if (galleryImageIds.length > 0) {
      const hasProductsImagesTable = await trx.schema.hasTable("products_images");
      if (hasProductsImagesTable) {
        await trx("products_images").where({ product_id: product.id }).delete();
        await trx("products_images").insert(
          galleryImageIds.map((savedImageId, index) => ({
            product_id: product.id,
            image_id: savedImageId,
            sort_order: index,
          }))
        );
      } else {
        logger.warn(
          "products_images table not found. Skipping gallery image relations."
        );
      }
    }

    if (data.colorIds.length > 0) {
      await trx("products_colors")
        .insert(
          data.colorIds.map((colorId) => ({
            product_id: product.id,
            color_id: Number(colorId),
          }))
        )
        .onConflict(["product_id", "color_id"]) // Handle duplicate entries
        .ignore();
      logger.info(
        `Product colors linked successfully for product: ${product.id}`
      );
    }

    if (data.sizeIds.length > 0) {
      await trx("products_sizes")
        .insert(
          data.sizeIds.map((sizeId) => ({
            product_id: product.id,
            size_id: Number(sizeId),
          }))
        )
        .onConflict(["product_id", "size_id"]) // Handle duplicate entries
        .ignore();
      logger.info(
        `Product sizes linked successfully for product: ${product.id}`
      );
    }
    revalidatePath("/inventories/products");
    revalidatePath("/inventories/variants");
    return product;
  });
}

export async function deleteProductOnConfirmed(id: bigint) {
  const deletedProduct = await deleteProduct({ id });
  revalidatePath("/inventories/products");
  revalidatePath("/inventories/variants");
  return deletedProduct;
}
