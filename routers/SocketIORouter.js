const SearchService = require('../services/SearchService')
class SocketIORouter {

    constructor(io, search) {
        this.io = io;
        this.search = search
    }

    router() {
        this.io.use((socket, next) => {
            if (!socket.session.passport) {
                socket.disconnect();
            } else {
                next();
            }
        });
        this.io.on('connection', this.connection.bind(this));
    }

    searchByName(socket) {
        return (data) => {
            return this.search.yelpAutocomplete(data).then((result) => {
                socket.emit('nameAutocompleteResult', result)
            })
        }
    }

    searchByID(socket) {
        return (data) => {
            return this.search.yelpIDSearch(data).then((result) => {
                socket.emit('IDSearchResult', result)
            })
        }
    }

    searchByLocation(socket) {
        return (data) => {
            return this.search.googleMapAutocomplete(data).then((result) => {
                socket.emit('locationSearchResult', result)
            })
        }
    }
    
    connection(socket) {
        socket.emit('username', socket.session.passport.user);

        socket.on('searchByName', this.searchByName(socket).bind(this));

        socket.on('searchByID', this.searchByName(socket).bind(this));

        socket.on('searchByLocation', this.searchByLocation(socket).bind(this));

    }
}

module.exports = SocketIORouter
