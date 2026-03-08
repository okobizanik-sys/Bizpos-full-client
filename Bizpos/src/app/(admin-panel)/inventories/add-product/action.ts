"use server";

import { filenameGenerator } from "@/utils/helpers";
import { processImage, saveImageBufferToFile } from "@/lib/sharp";
import { logger } from "@/lib/winston";
import { revalidatePath } from "next/cache";
import db from "@/db/database";

export async function createProductFormAction(formData: FormData) {
  try {
    const createdProduct = await db.transaction(async (trx) => {
      let brandId: number | null = null;
      if (formData.get("brandId") === "") {
        brandId = null;
      } else {
        brandId = Number(formData.get("brandId"));
      }
      const data = {
        files: formData.getAll("files") as File[],
        name: formData.get("name"),
        sellingPrice: Number(formData.get("sellingPrice")),
        categoryId: Number(formData.get("categoryId")),
        brandId: brandId,
        colorIds: formData.getAll("colorIds"),
        sizeIds: formData.getAll("sizeIds"),
        sku: formData.get("sku") as string,
        // DB column is varchar(255), so keep payload within the limit.
        description: ((formData.get("description") as string) || "").slice(
          0,
          255,
        ),
      };

      const existingProduct = await trx("products")
        .where({ sku: data.sku })
        .first();
      if (existingProduct) {
        throw new Error("SKU already exists. Please use another SKU.");
      }

      let imageId: number | null = null;
      const galleryImageIds: number[] = [];

      if (data.files.length > 0) {
        try {
          for (const file of data.files) {
            const processedFile = await processImage(file, 400, 400);
            const filename = filenameGenerator(
              file.name,
              "product",
              "/images/products",
            );
            await saveImageBufferToFile(processedFile, filename);
            logger.info(`File uploaded successfully: ${filename}`);

            const [insertImageResult] = await trx("images").insert({
              url: filename,
            });

            const [image] = await trx("images").where({ id: insertImageResult });
            galleryImageIds.push(image.id);
          }

          imageId = galleryImageIds[0] ?? null;
          logger.info(`Image(s) created successfully: ${galleryImageIds.join(",")}`);
        } catch {
          throw new Error("Image upload failed");
        }
      }

      const [insertProductResult] = await trx("products").insert({
        name: data.name,
        sku: data.sku,
        selling_price: data.sellingPrice,
        description: data.description,
        category_id: data.categoryId,
        brand_id: data.brandId,
        image_id: imageId,
      });
      const lastInsertProductId = insertProductResult;

      const [product] = await trx("products").where({
        id: lastInsertProductId,
      });

      logger.info(`Product created successfully: ${product.id}`);

      if (galleryImageIds.length > 0) {
        const hasProductsImagesTable = await trx.schema.hasTable(
          "products_images",
        );
        if (hasProductsImagesTable) {
          await trx("products_images").insert(
            galleryImageIds.map((id, index) => ({
              product_id: product.id,
              image_id: id,
              sort_order: index,
            })),
          );
        } else {
          logger.warn(
            "products_images table not found. Skipping gallery image relations.",
          );
        }
      }

      if (data.colorIds.length > 0) {
        await trx("products_colors").insert(
          data.colorIds.map((colorId) => ({
            product_id: product.id,
            color_id: Number(colorId),
          })),
        );
        logger.info(
          `Product colors linked successfully for product: ${product.id}`,
        );
      }

      if (data.sizeIds.length > 0) {
        await trx("products_sizes").insert(
          data.sizeIds.map((sizeId) => ({
            product_id: product.id,
            size_id: Number(sizeId),
          })),
        );
        logger.info(
          `Product sizes linked successfully for product: ${product.id}`,
        );
      }

      revalidatePath("/inventories/products");
      revalidatePath("/inventories/variants");
      return product;
    });
    return {
      success: true,
      message: "product creation successful",
      barcode: createdProduct?.barcode,
    };
  } catch (error) {
    logger.error("Error creating product:", error);
    const err = error as { message?: string; code?: string; sqlMessage?: string };
    if (err?.message?.includes("SKU already exists")) {
      throw new Error("SKU already exists. Please use another SKU.");
    }
    if (err?.code === "ER_DUP_ENTRY") {
      throw new Error("SKU already exists. Please use another SKU.");
    }
    if (err?.code === "ER_NO_SUCH_TABLE") {
      throw new Error(
        "Missing DB table. Run database migrations and try again.",
      );
    }
    if (err?.code === "ER_DATA_TOO_LONG") {
      throw new Error(
        "Product description is too long. Please shorten the description.",
      );
    }
    throw new Error(err?.sqlMessage || err?.message || "Failed to create product");
  }
}
