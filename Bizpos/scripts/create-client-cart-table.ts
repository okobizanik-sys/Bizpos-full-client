import db from "../src/db/database";

async function run() {
  const exists = await db.schema.hasTable("client_cart_items");
  if (exists) {
    console.log("client_cart_items already exists");
    await db.destroy();
    return;
  }

  await db.schema.createTable("client_cart_items", (table) => {
    table.bigIncrements("id").primary();
    table.string("user_ref", 255).notNullable().index();
    table.bigInteger("product_id").unsigned().notNullable().index();
    table.string("barcode", 255).notNullable().index();
    table.integer("quantity").notNullable().defaultTo(1);
    table.timestamp("created_at").defaultTo(db.fn.now());
    table.timestamp("updated_at").defaultTo(db.fn.now());
  });

  console.log("client_cart_items created");
  await db.destroy();
}

run().catch(async (error) => {
  console.error("Failed creating client_cart_items:", error);
  await db.destroy();
  process.exit(1);
});
