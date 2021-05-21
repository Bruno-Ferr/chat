import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('chatusers', (table) => {
    table.increments('id').primary()
    table.string('chatId', 40).notNullable()
    table.string('userId', 40).notNullable()
    table.string('chatname', 50).defaultTo(null)
    table.foreign('userId').references('id').inTable('users')
    table.foreign('chatId').references('id').inTable('chats')
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('chatusers')
}

