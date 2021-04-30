import knex from 'knex';

const connection = knex({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    user: 'Bruno',
    password: '@admin',
    database: 'chat'
  }
})

export { connection };