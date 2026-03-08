import db from "@/db/database";

type Pagination = {
  currentPage: number;
  currentPageLimit: number;
  total: number;
  totalPage: number;
  prevPage: number | null;
  nextPage: number | null;
};

type ProductGalleryMap = Map<string, string[]>;

type StorefrontProduct = {
  _id: string;
  productId: string;
  name: string;
  description: string;
  slug: string;
  price: number;
  mrpPrice: number;
  thumbnailImage: string;
  backViewImage: string;
  sizeChartImage: string;
  images: string[];
  inventoryType:
    | "inventory"
    | "levelInventory"
    | "colorInventory"
    | "colorLevelInventory";
  inventoryRef: Array<{
    _id: string;
    quantity: number;
    availableQuantity: number;
    soldQuantity: number;
    holdQuantity: number;
    color: string;
    name: string;
    level: string;
    inventoryID: string;
    productRef: string;
  }>;
};

const configuredBranchId = Number(process.env.STOREFRONT_BRANCH_ID || "1");
const BRANCH_ID =
  Number.isFinite(configuredBranchId) && configuredBranchId > 0
    ? Math.floor(configuredBranchId)
    : 1;

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const parsePositiveInt = (value: string | null, fallback: number) => {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed <= 0) {
    return fallback;
  }
  return Math.floor(parsed);
};

const getProductGalleryMap = async (
  productIds: number[]
): Promise<ProductGalleryMap> => {
  if (productIds.length === 0) return new Map();

  let rows: Array<{ productId: number; imageUrl: string }> = [];

  try {
    const hasProductsImagesTable = await db.schema.hasTable("products_images");

    if (hasProductsImagesTable) {
      rows = await db("products_images")
        .whereIn("products_images.product_id", productIds)
        .leftJoin("images", "products_images.image_id", "images.id")
        .select(
          "products_images.product_id as productId",
          "images.url as imageUrl"
        )
        .orderBy("products_images.product_id", "asc")
        .orderBy("products_images.sort_order", "asc")
        .orderBy("products_images.created_at", "asc");
    } else {
      // Fallback for environments where gallery table migration is not applied.
      rows = await db("products")
        .whereIn("products.id", productIds)
        .leftJoin("images", "products.image_id", "images.id")
        .select("products.id as productId", "images.url as imageUrl")
        .orderBy("products.id", "asc");
    }
  } catch {
    rows = await db("products")
      .whereIn("products.id", productIds)
      .leftJoin("images", "products.image_id", "images.id")
      .select("products.id as productId", "images.url as imageUrl")
      .orderBy("products.id", "asc");
  }

  const map: ProductGalleryMap = new Map();
  for (const row of rows) {
    const key = String(row.productId);
    const url = String(row.imageUrl || "");
    if (!url) continue;

    if (!map.has(key)) map.set(key, []);
    map.get(key)!.push(url);
  }

  return map;
};

const resolveProductImages = (
  primaryImageUrl: string,
  galleryImages: string[] = []
) => {
  const validGalleryImages = galleryImages.filter(Boolean);
  const thumbnailImage = validGalleryImages[0] || primaryImageUrl || "";
  const backViewImage =
    validGalleryImages[1] || validGalleryImages[0] || primaryImageUrl || "";

  return {
    thumbnailImage,
    backViewImage,
    images: validGalleryImages.length > 0 ? validGalleryImages : thumbnailImage ? [thumbnailImage] : [],
  };
};

const toStorefrontProduct = (
  row: any,
  galleryImages: string[] = []
): StorefrontProduct => {
  const productId = String(row.productId);
  const imageUrl = row.imageUrl || "";
  const imageFields = resolveProductImages(imageUrl, galleryImages);
  const productSlug = `${slugify(row.name || "product")}-${productId}`;
  const quantity = Number(row.quantity || 0);
  const color = row.colorName || "";
  const level = row.sizeName || "";
  const inventoryType = color && level
    ? "colorLevelInventory"
    : color
      ? "colorInventory"
      : level
        ? "levelInventory"
        : "inventory";

  return {
    _id: productId,
    productId,
    name: row.name || "",
    description: row.description || "",
    slug: productSlug,
    price: Number(row.selling_price || 0),
    mrpPrice: Number(row.selling_price || 0),
    thumbnailImage: imageFields.thumbnailImage,
    backViewImage: imageFields.backViewImage,
    sizeChartImage: "",
    images: imageFields.images,
    inventoryType,
    inventoryRef: [
      {
        _id: row.barcode || `inventory-${productId}`,
        quantity,
        availableQuantity: quantity,
        soldQuantity: 0,
        holdQuantity: 0,
        color,
        name: [row.name || "", color, level].filter(Boolean).join(" ").trim(),
        level,
        inventoryID: row.barcode || `inventory-${productId}`,
        productRef: productId,
      },
    ],
  };
};

const mapStockRowsToProducts = (
  rows: any[],
  galleryMap: ProductGalleryMap = new Map()
): StorefrontProduct[] => {
  const grouped = new Map<string, any[]>();

  for (const row of rows) {
    const key = String(row.productId);
    if (!grouped.has(key)) grouped.set(key, []);
    grouped.get(key)!.push(row);
  }

  return Array.from(grouped.values()).map((productRows) => {
    const first = productRows[0];
    const galleryImages = galleryMap.get(String(first.productId)) || [];
    const base = toStorefrontProduct({
      ...first,
      quantity: productRows.reduce(
        (sum: number, row: any) => sum + Number(row.quantity || 0),
        0
      ),
    }, galleryImages);

    const inventories = productRows.map((row, idx) => ({
      _id: row.barcode || `inventory-${first.productId}-${idx + 1}`,
      quantity: Number(row.quantity || 0),
      availableQuantity: Number(row.quantity || 0),
      soldQuantity: 0,
      holdQuantity: 0,
      color: row.colorName || "",
      name: [first.name || "", row.colorName || "", row.sizeName || ""]
        .filter(Boolean)
        .join(" ")
        .trim(),
      level: row.sizeName || "",
      inventoryID: row.barcode || `inventory-${first.productId}-${idx + 1}`,
      productRef: String(first.productId),
    }));

    const hasColor = inventories.some((item) => Boolean(item.color));
    const hasLevel = inventories.some((item) => Boolean(item.level));
    const inventoryType = hasColor && hasLevel
      ? "colorLevelInventory"
      : hasColor
        ? "colorInventory"
        : hasLevel
          ? "levelInventory"
          : "inventory";

    return {
      ...base,
      inventoryType,
      inventoryRef: inventories,
    } as StorefrontProduct;
  });
};

export async function getStorefrontProducts(input: {
  page?: number;
  perPage?: number;
  categorySlug?: string | null;
  search?: string | null;
}) {
  const page = input.page || 1;
  const perPage = input.perPage || 20;
  const offset = (page - 1) * perPage;

  const baseQuery = db("products")
    .leftJoin("categories", "products.category_id", "categories.id");

  if (input.categorySlug) {
    const categoryNames = input.categorySlug
      .split(",")
      .map((value) => value.trim())
      .filter(Boolean)
      .map((value) => value.replace(/-/g, " "));

    if (categoryNames.length > 0) {
      baseQuery.whereRaw(
        `LOWER(categories.name) IN (${categoryNames.map(() => "?").join(",")})`,
        categoryNames.map((name) => name.toLowerCase())
      );
    }
  }

  if (input.search) {
    baseQuery.andWhere(function queryBySearch() {
      this.where("products.name", "like", `%${input.search}%`).orWhere(
        "products.sku",
        "like",
        `%${input.search}%`
      );
    });
  }

  const totalRows = await baseQuery.clone().countDistinct("products.id as total").first();
  const total = Number(totalRows?.total || 0);

  const pagedProductRows = await baseQuery
    .clone()
    .select("products.id as productId")
    .orderBy("products.id", "desc")
    .limit(perPage)
    .offset(offset);
  const productIds = pagedProductRows.map((row: any) => Number(row.productId));

  if (productIds.length === 0) {
    const pagination: Pagination = {
      currentPage: page,
      currentPageLimit: perPage,
      total,
      totalPage: Math.max(1, Math.ceil(total / perPage)),
      prevPage: page > 1 ? page - 1 : null,
      nextPage: page * perPage < total ? page + 1 : null,
    };
    return { result: [], pagination };
  }

  const rows = await db("products")
    .whereIn("products.id", productIds)
    .leftJoin("images", "products.image_id", "images.id")
    .leftJoin("stocks", function joinStocks() {
      this.on("stocks.product_id", "=", "products.id").andOnVal(
        "stocks.condition",
        "new"
      );
    })
    .leftJoin("colors", "stocks.color_id", "colors.id")
    .leftJoin("sizes", "stocks.size_id", "sizes.id")
    .select(
      "products.id as productId",
      "products.name",
      "products.selling_price",
      "products.description",
      "images.url as imageUrl",
      "stocks.barcode",
      "stocks.quantity",
      "colors.name as colorName",
      "sizes.name as sizeName"
    )
    .orderBy("products.id", "desc");

  const galleryMap = await getProductGalleryMap(productIds);

  const pagination: Pagination = {
    currentPage: page,
    currentPageLimit: perPage,
    total,
    totalPage: Math.max(1, Math.ceil(total / perPage)),
    prevPage: page > 1 ? page - 1 : null,
    nextPage: page * perPage < total ? page + 1 : null,
  };

  return {
    result: mapStockRowsToProducts(rows, galleryMap),
    pagination,
  };
}

export async function getStorefrontProductBySlug(slug: string) {
  const productId = Number(slug.split("-").pop());
  if (!Number.isFinite(productId)) return null;

  const rows = await db("products")
    .where("products.id", Number(productId))
    .leftJoin("images", "products.image_id", "images.id")
    .leftJoin("stocks", function joinStocks() {
      this.on("stocks.product_id", "=", "products.id").andOnVal(
        "stocks.condition",
        "new"
      );
    })
    .leftJoin("colors", "stocks.color_id", "colors.id")
    .leftJoin("sizes", "stocks.size_id", "sizes.id")
    .select(
      "products.id as productId",
      "products.name",
      "products.selling_price",
      "products.description",
      "images.url as imageUrl",
      "stocks.barcode",
      "stocks.quantity",
      "colors.name as colorName",
      "sizes.name as sizeName"
    )
    .orderBy("products.id", "desc");

  if (!rows.length) return null;
  const galleryMap = await getProductGalleryMap([productId]);
  return mapStockRowsToProducts(rows, galleryMap)[0] || null;
}

export async function getRelatedStorefrontProducts(productId: number) {
  const current = await db("products")
    .where({ id: productId })
    .select("category_id")
    .first();

  if (!current?.category_id) return [];

  const relatedProductRows = await db("products")
    .where("products.category_id", current.category_id)
    .andWhere("products.id", "!=", productId)
    .select("products.id as productId")
    .orderBy("products.id", "desc")
    .limit(8);
  const productIds = relatedProductRows.map((row: any) => Number(row.productId));
  if (!productIds.length) return [];

  const rows = await db("products")
    .whereIn("products.id", productIds)
    .leftJoin("images", "products.image_id", "images.id")
    .leftJoin("stocks", function joinStocks() {
      this.on("stocks.product_id", "=", "products.id").andOnVal(
        "stocks.condition",
        "new"
      );
    })
    .leftJoin("colors", "stocks.color_id", "colors.id")
    .leftJoin("sizes", "stocks.size_id", "sizes.id")
    .select(
      "products.id as productId",
      "products.name",
      "products.selling_price",
      "products.description",
      "images.url as imageUrl",
      "stocks.barcode",
      "stocks.quantity",
      "colors.name as colorName",
      "sizes.name as sizeName"
    )
    .orderBy("products.id", "desc");
  const galleryMap = await getProductGalleryMap(productIds);
  return mapStockRowsToProducts(rows, galleryMap);
}

export async function getNavbarCategories() {
  const rows = await db("categories").select("id", "name").orderBy("name", "asc");
  return rows.map((row) => ({
    _id: String(row.id),
    name: row.name,
    slug: slugify(row.name || ""),
    subCategories: [],
  }));
}

export async function getCategoryById(id: number) {
  const row = await db("categories").where({ id }).first();
  if (!row) return null;
  return {
    _id: String(row.id),
    name: row.name,
    slug: slugify(row.name || ""),
    subCategories: [],
  };
}

export async function addToStorefrontCart(input: {
  userRef: string;
  productRef: string;
  quantity: number;
  inventoryRef?: string | null;
}) {
  const productId = Number(input.productRef);
  const quantity = Number(input.quantity || 1);

  if (!Number.isFinite(productId) || quantity <= 0) {
    throw new Error("Invalid product or quantity");
  }

  const stockQuery = db("stocks")
    .where("stocks.condition", "new")
    .andWhere("stocks.product_id", productId);

  if (input.inventoryRef) {
    stockQuery.andWhere("stocks.barcode", String(input.inventoryRef));
  }

  const stock = await stockQuery
    .select("stocks.barcode")
    .sum("stocks.quantity as quantity")
    .groupBy("stocks.barcode")
    .orderBy("quantity", "desc")
    .first() as { barcode: string; quantity: number } | undefined;

  if (!stock || Number(stock.quantity || 0) < quantity) {
    throw new Error("Insufficient stock");
  }

  const existing = await db("client_cart_items")
    .where({
      user_ref: input.userRef,
      product_id: productId,
      barcode: stock.barcode,
    })
    .first();

  if (existing) {
    await db("client_cart_items").where({ id: existing.id }).update({
      quantity: Number(existing.quantity || 0) + quantity,
      updated_at: new Date(),
    });
    return { message: "Product quantity updated in cart" };
  }

  await db("client_cart_items").insert({
    user_ref: input.userRef,
    product_id: productId,
    barcode: stock.barcode,
    quantity,
    created_at: new Date(),
    updated_at: new Date(),
  });

  return { message: "Product added to cart" };
}

export async function getStorefrontCart(userRef: string) {
  const rows = await db("client_cart_items")
    .where("client_cart_items.user_ref", userRef)
    .leftJoin("products", "client_cart_items.product_id", "products.id")
    .leftJoin("images", "products.image_id", "images.id")
    .leftJoin("stocks as matched_stocks", function joinMatchedStock() {
      this.on("matched_stocks.product_id", "=", "client_cart_items.product_id")
        .andOn("matched_stocks.barcode", "=", "client_cart_items.barcode");
    })
    .leftJoin("stocks as barcode_stocks", function joinFallbackStock() {
      this.on("barcode_stocks.barcode", "=", "client_cart_items.barcode");
    })
    .leftJoin("colors as matched_colors", "matched_stocks.color_id", "matched_colors.id")
    .leftJoin("sizes as matched_sizes", "matched_stocks.size_id", "matched_sizes.id")
    .leftJoin("colors as fallback_colors", "barcode_stocks.color_id", "fallback_colors.id")
    .leftJoin("sizes as fallback_sizes", "barcode_stocks.size_id", "fallback_sizes.id")
    .select(
      "client_cart_items.id as cartId",
      "client_cart_items.quantity",
      "client_cart_items.barcode",
      "products.id as productId",
      "products.name",
      "products.selling_price",
      "products.description",
      "images.url as imageUrl",
      db.raw("COALESCE(matched_colors.name, fallback_colors.name, '') as colorName"),
      db.raw("COALESCE(matched_sizes.name, fallback_sizes.name, '') as sizeName"),
      db.raw(
        "COALESCE(matched_stocks.quantity, barcode_stocks.quantity, client_cart_items.quantity) as stockQty"
      )
    )
    .orderBy("client_cart_items.id", "desc");

  const productIds = Array.from(
    new Set(rows.map((row) => Number(row.productId)).filter(Number.isFinite))
  );
  const galleryMap = await getProductGalleryMap(productIds);

  const cartDetails = rows.map((row) => {
    const product = toStorefrontProduct({
      productId: row.productId,
      name: row.name,
      description: row.description,
      selling_price: row.selling_price,
      imageUrl: row.imageUrl,
      barcode: row.barcode,
      quantity: row.stockQty,
      colorName: row.colorName,
      sizeName: row.sizeName,
    }, galleryMap.get(String(row.productId)) || []);

    const subtotal = Number(row.selling_price || 0) * Number(row.quantity || 0);

    return {
      _id: String(row.cartId),
      cartId: String(row.cartId),
      quantity: Number(row.quantity || 0),
      product,
      inventory: product.inventoryRef[0],
      subtotal,
      productDiscount: 0,
      savedAmount: 0,
    };
  });

  const totalPrice = cartDetails.reduce(
    (sum: number, row: any) => sum + Number(row.subtotal || 0),
    0
  );

  return {
    cartDetails,
    couponDiscount: 0,
    productDiscount: 0,
    totalPrice,
    totalSaved: 0,
    productRef: cartDetails[0]?.product?._id || "",
    quantity: cartDetails[0]?.quantity || 0,
  };
}

export async function removeStorefrontCartItem(cartId: number) {
  return db("client_cart_items").where({ id: cartId }).delete();
}

const createOrderId = () => {
  const now = new Date();
  const parts = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
    String(now.getHours()).padStart(2, "0"),
    String(now.getMinutes()).padStart(2, "0"),
    String(now.getSeconds()).padStart(2, "0"),
    String(Math.floor(Math.random() * 1000)).padStart(3, "0"),
  ];
  return parts.join("");
};

export async function createStorefrontOrder(input: any) {
  const userRef = String(input.userRef || "");
  if (!userRef) {
    throw new Error("userRef is required");
  }

  return db.transaction(async (trx) => {
    const cartRows = await trx("client_cart_items")
      .where("client_cart_items.user_ref", userRef)
      .leftJoin("products", "client_cart_items.product_id", "products.id")
      .leftJoin("stocks", function joinStock() {
        this.on("stocks.product_id", "=", "client_cart_items.product_id")
          .andOn("stocks.barcode", "=", "client_cart_items.barcode")
          .andOnVal("stocks.condition", "new");
      })
      .select(
        "client_cart_items.id as cartId",
        "client_cart_items.product_id as productId",
        "client_cart_items.quantity as cartQty",
        "client_cart_items.barcode",
        "products.selling_price",
        "stocks.id as stockId",
        "stocks.quantity as stockQty",
        "stocks.branch_id as stockBranchId",
        "stocks.cost",
        "stocks.color_id as colorId",
        "stocks.size_id as sizeId"
      );

    if (cartRows.length === 0) {
      throw new Error("Cart is empty");
    }

    for (const row of cartRows) {
      if (!row.stockId || Number(row.stockQty || 0) < Number(row.cartQty || 0)) {
        throw new Error(`Insufficient stock for barcode ${row.barcode}`);
      }
    }

    const [customerId] = await trx("customers").insert({
      customer: input.customerName || "Online Customer",
      phone: String(input.customerPhone || ""),
      address: String(input.customerAddress || ""),
      created_at: new Date(),
      updated_at: new Date(),
    });

    const subTotal = cartRows.reduce(
      (sum, row) =>
        sum + Number(row.selling_price || 0) * Number(row.cartQty || 0),
      0
    );

    const discount = Number(input.couponDiscount || 0);
    const deliveryCharge = Number(input.shippingCost || 0);
    const total = subTotal - discount + deliveryCharge;
    const orderId = createOrderId();

    const orderBranchId =
      Number(cartRows[0]?.stockBranchId || 0) > 0
        ? Number(cartRows[0].stockBranchId)
        : BRANCH_ID;

    const [orderPk] = await trx("orders").insert({
      order_id: orderId,
      total,
      sub_total: subTotal,
      customer_id: customerId,
      branch_id: orderBranchId,
      discount,
      delivery_charge: deliveryCharge,
      payment_method: input.paymentMethod || "CashOnDelivery",
      created_at: new Date(),
      updated_at: new Date(),
    });

    for (const row of cartRows) {
      await trx("order_items").insert({
        order_id: orderPk,
        product_id: row.productId,
        quantity: row.cartQty,
        price: Number(row.selling_price || 0) * Number(row.cartQty || 0),
        barcode: row.barcode,
        cogs: Number(row.cost || 0) * Number(row.cartQty || 0),
        color_id: row.colorId || null,
        size_id: row.sizeId || null,
        created_at: new Date(),
        updated_at: new Date(),
      });

      const newQty = Number(row.stockQty || 0) - Number(row.cartQty || 0);
      if (newQty > 0) {
        await trx("stocks").where({ id: row.stockId }).update({
          quantity: newQty,
          updated_at: new Date(),
        });
      } else {
        await trx("stocks").where({ id: row.stockId }).delete();
      }
    }

    await trx("client_cart_items").where("user_ref", userRef).delete();

    return { orderPk, orderId };
  });
}

export const queryParams = {
  parsePositiveInt,
};
