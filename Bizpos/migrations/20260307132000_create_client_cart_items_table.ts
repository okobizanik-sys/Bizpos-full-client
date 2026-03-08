import type { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable("client_cart_items", (table) => {
    table.bigIncrements("id").primary();
    table.string("user_ref", 255).notNullable().index();
    table.bigInteger("product_id").unsigned().notNullable().index();
    table.string("barcode", 255).notNullable().index();
    table.integer("quantity").notNullable().defaultTo(1);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists("client_cart_items");
}
