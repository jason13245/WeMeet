// Update with your config settings.
require('dotenv').config();

module.exports = {

  development: {
    client: 'postgresql',
    connection: {
      database:process.env.POSTGRE_SQL_DBNAME,
      user:process.env.POSTGRE_SQL_USERNAME,
      password:process.env.POSTGRE_SQL_PASSWORD
    },
    pool:{
      min:2,
      max:10
    },
    migrations:{
      tableName: 'knex_migrations'
    }
  },

  staging: {
    client: 'postgresql',
    connection: {
      database: process.env.POSTGRE_SQL_DBNAME,
      user:     process.env.POSTGRE_SQL_USERNAME,
      password: process.env.POSTGRE_SQL_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  },

  production: {
    client: 'postgresql',
    connection: {
      database: process.env.POSTGRE_SQL_DBNAME,
      user:     process.env.POSTGRE_SQL_USERNAME,
      password: process.env.POSTGRE_SQL_PASSWORD
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      tableName: 'knex_migrations'
    }
  }

};
