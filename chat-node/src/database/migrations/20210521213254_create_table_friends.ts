import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('friends', (table) => {
    table.increments('id').primary()
    table.string('Email', 40).notNullable()
    table.string('userId', 40).notNullable()
    table.string('friendname', 50).defaultTo(null)
    table.foreign('userId').references('id').inTable('users')
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('friends')
}

