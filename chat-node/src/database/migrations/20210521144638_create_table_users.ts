import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('users', (table) => {
    table.uuid('id').unique().notNullable().primary()
    table.text('Email').notNullable()
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('users')
}

