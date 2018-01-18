const db = require('../knex-database-config');
const client = require('../redis-database-config');

module.exports = class ExampleController{
    greeting(req, res) {
        res.json({'message': 'Welcome to WeMeet!'});
    }    
}