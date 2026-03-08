import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("products_images", (table) => {
    table
      .bigInteger("product_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("products")
      .onDelete("CASCADE");

    table
      .integer("image_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("images")
      .onDelete("CASCADE");

    table.integer("sort_order").notNullable().defaultTo(0);
    table.timestamps(true, true);

    table.primary(["product_id", "image_id"]);
    table.index(["product_id", "sort_order"], "products_images_product_sort_idx");
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTableIfExists("products_images");
}
