module.exports = class NotesController{
    greeting(req, res) {
        res.json({'message': 'Welcome to WeMeet!'});
    }
}