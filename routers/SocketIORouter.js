const SearchService = require('../services/SearchService')
class SocketIORouter {

    constructor(io, searchService, voteDateService, votePlaceService) {
        this.io = io;
        this.searchService = searchService;
        this.voteDateService = voteDateService;
        this.votePlaceService = votePlaceService;
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



    connection(socket) {
        //socket.emit('username', socket.session.passport.user);

        //events of search places
        socket.on('searchPlaceByName', this.searchPlaceByName(socket).bind(this));

        socket.on('searchPlaceById', this.searchPlaceById(socket).bind(this));

        //events of voting dates 
        socket.on('dateCreated', this.createDate(socket).bind(this));

        socket.on('dateVoteIncrease', this.dateVoteIncrease(socket).bind(this));

        socket.on('dateVoteDecrease', this.dateVoteDecrease(socket).bind(this));

        socket.on('listAllDatesByEvent', this.listAllDatesByEvent(socket).bind(this));

        //events of voting places
        socket.on('createPlace', this.createPlace(socket).bind(this));

        socket.on('placeVoteIncrease', this.votePlaceIncrease(socket).bind(this));

        socket.on('placeVoteDecrease', this.votePlaceDecrease(socket).bind(this));

        socket.on('listAllPlacesByEvent', this.listAllPlacesByEvent(socket).bind(this));
    }

    //place functions
    createPlace(socket){
        return (data)=>{
            return this.votePlaceService.createPlace(data).then((output)=>{
                socket.emit('placeTableUpdated', output);
            }).catch((err) => {
                socket.emit('errorMessage', err);
            });
        };
    }

    votePlaceIncrease(socket){
        return (data)=>{
            return this.votePlaceService.votePlaceIncrease(data).then((output)=>{
                socket.emit('placeTableUpdated', output);
            }).catch((err) => {
                socket.emit('errorMessage', err);
            });
        };
    }

    votePlaceDecrease(socket){
        return (data)=>{
            return this.votePlaceService.votePlaceDecrease(data).then((output)=>{
                socket.emit('placeTableUpdated', output);
            }).catch((err) => {
                socket.emit('errorMessage', err);
            });
        };
    }

    listAllPlacesByEvent(socket){
        return (data)=>{
            return this.votePlaceService.listAllPlacesByEvent(data).then((output)=>{
                socket.emit('placeTableUpdated', output);
            }).catch((err) => {
                socket.emit('errorMessage', err);
            });
        };
    }

    //date functions
    createDate(socket){
        return (data)=>{
            return this.voteDateService.createDate(data).then((output)=>{
                socket.to("event" + data.eventId).emit('dateTableUpdated', output);
            }).catch((err) => {
                socket.to("event" + data.eventId).emit('error_message_for_date', err);
            });
        };
    }

    dateVoteIncrease(socket){
        return (data)=>{
            return this.voteDateService.dateVoteIncrease(data).then((output)=>{
                socket.to("event" + data.eventId).emit('dateTableUpdated', output);
            }).catch((err) => {
                socket.to("event" + data.eventId).emit('error_message_for_date', err);
            });
        };
    }

    dateVoteDecrease(socket){
        return (data)=>{
            return this.voteDateService.dateVoteDecrease(data).then((output)=>{
                socket.to("event" + data.eventId).emit('dateTableUpdated', output);
            }).catch((err) => {
                socket.to("event" + data.eventId).emit('error_message_for_date', err);
            });
        };
    }

    listAllDatesByEvent(socket){
        return (data)=>{
            return this.voteDateService.listAllDatesByEvent(data).then((dates)=>{
                socket.to("event" + data.eventId).emit('dateTableUpdated', output);
            }).catch((err) => {
                socket.to("event" + data.eventId).emit('error_message_for_date', err);
            });
            
        };
    }

    // search functions
    searchPlaceByName(socket) {
        return (data) => {
            return this.searchService.yelpAutocomplete(data).then((output) => {
                socket.to("event" + data.eventId).emit('yelpAutocompleteResult', output)
            }).catch((err) => {
                socket.to("event" + data.eventId).emit('errMessage', err)
            })
        }
    }

    searchPlaceById(socket) {
        return (data) => {
            return this.searchService.yelpIDSearch(data).then((output) => {
                socket.to("event" + data.eventId).emit('yelpIdResult', output)
            }).catch((err) => {
                socket.to("event" + data.eventId).emit('errMessage', err)
            })
        }
    }

}

module.exports = SocketIORouter
