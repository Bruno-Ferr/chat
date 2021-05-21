module.exports = {
  development: {
    client: 'mysql2',
    connection: {
      database: process.env.DATABASE_NAME,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASSWORD
    },
    migrations: {
      directory: `${__dirname}/src/database/migrations`
    }
  }
};