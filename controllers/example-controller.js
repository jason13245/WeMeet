const db = require('../knex-database-config');
const client = require('../redis-database-config');

module.exports = class NotesController{
    greeting(req, res) {
        res.json({'message': 'Welcome to WeMeet!'});
    }    
}