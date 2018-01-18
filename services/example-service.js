const db = require('../knex-database-config');
const client = require('../redis-database-config');

module.exports = class ExampleService{
    greeting() {
        return {'message': 'Welcome to WeMeet!'};
    }    
}