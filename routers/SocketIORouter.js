const SearchService = require('../services/SearchService')
class SocketIORouter {

    constructor(io, search, VoteDate, VotePlace) {
        this.io = io;
        this.searchService = search;
        this.voteDateService = VoteDate;
        this.votePlaceService = VotePlace;
    }

    router() {
        //     this.io.use((socket, next) => {
        //         if (!socket.session.passport) {
        //             socket.disconnect();
        //         } else {
        //             next();
        //         }
        //     });
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
            // return this.voteDateService.listAllDatesByEvent(data).then((dates)=>{
            //     this.io.to("event_" + data.event_url).emit('date_table_updated', output);
            // }).catch((err) => {
            //     this.io.to("event_" + data.event_url).emit('error_message_for_date', err);
            // });

            return this.voteDateService.listAllDatesByEvent(data).then((dates)=>{
                socket.to("event" + data.eventId).emit('dateTableUpdated', output);
            }).catch((err) => {
                socket.to("event" + data.eventId).emit('error_message_for_date', err);
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
