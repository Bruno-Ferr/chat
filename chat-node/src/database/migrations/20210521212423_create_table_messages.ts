import { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('messages', (table) => {
    table.increments('id').primary()
    table.string('chatId', 40).notNullable()
    table.string('author', 40).notNullable()
    table.text('messageBody').defaultTo(null)
    table.timestamp('sendedat').defaultTo(knex.fn.now())
    table.boolean('seen').defaultTo(false)
    table.foreign('author').references('id').inTable('users')
    table.foreign('chatId').references('id').inTable('chats')
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('messages')
}

