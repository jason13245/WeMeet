require('dotenv').config();

const knex = require('knex')({
    client: 'pg',
    connection: {
      host : process.env.HOST,
      user : POSTGRE_SQL_USERNAME,
      password : POSTGRE_SQL_PASSWORD,
      database : POSTGRE_SQL_DBNAME
    }
});

module.exports = knex;