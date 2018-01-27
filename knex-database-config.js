require('dotenv').config();

const knex = require('knex')({
    client: 'pg',
    connection: {
      host : process.env.HOST,
      user : process.env.POSTGRE_SQL_USERNAME,
      password : process.env.POSTGRE_SQL_PASSWORD,
      database : process.env.POSTGRE_SQL_DBNAME
    }
});

module.exports = knex;