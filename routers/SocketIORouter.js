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

    // date functions
    createDate(socket) {
        return (data) => {
            return this.voteDateService.createDate(data).then((output) => {
                // this.io.to("event_" + data.event_url).emit('date_table_updated', output);
                //console.log(output);
                socket.emit('dateTableUpdated', output);
            }).catch((err) => {
                socket.to("event_" + data.eventUrl).emit('error_message_for_date', err);
            });
        };
    }

    dateVoteIncrease(socket) {
        return (data) => {
            return this.voteDateService.dateVoteIncrease(data).then((output) => {
                socket.emit('dateTableUpdated', output);
            }).catch((err) => {
                socket.to("event_" + data.eventUrl).emit('error_message_for_date', err);
            });
        };
    }

    dateVoteDecrease(socket) {
        return (data) => {
            return this.voteDateService.dateVoteDecrease(data).then((output) => {
                socket.emit('dateTableUpdated', output);
            }).catch((err) => {
                socket.to("event_" + data.eventUrl).emit('error_message_for_date', err);
            });
        };
    }

    listAllDatesByEvent(socket) {
        return (data) => {
            // return this.voteDateService.listAllDatesByEvent(data).then((dates)=>{
            //     this.io.to("event_" + data.event_url).emit('date_table_updated', output);
            // }).catch((err) => {
            //     this.io.to("event_" + data.event_url).emit('error_message_for_date', err);
            // });

            return this.voteDateService.listAllDatesByEvent(data).then((dates) => {
                socket.emit('dateTableUpdated', dates);
            }).catch((err) => {
                socket.emit('errorMssageForDate', err);
            });

        };
    }

    //place functions
    createPlace(socket) {
        return (data) => {
            return this.votePlaceService.createPlace(data).then((output) => {
                socket.emit('placeTableUpdated', output);
            }).catch((err) => {
                socket.emit('errorMessage', err);
            });
        };
    }

    votePlaceIncrease(socket) {
        return (data) => {
            return this.votePlaceService.votePlaceIncrease(data).then((output) => {
                socket.emit('placeTableUpdated', output);
            }).catch((err) => {
                socket.emit('errorMessage', err);
            });
        };
    }

    votePlaceDecrease(socket) {
        return (data) => {
            return this.votePlaceService.votePlaceDecrease(data).then((output) => {
                socket.emit('placeTableUpdated', output);
            }).catch((err) => {
                socket.emit('errorMessage', err);
            });
        };
    }

    listAllPlacesByEvent(socket) {
        return (data) => {
            return this.votePlaceService.listAllPlacesByEvent(data).then((output) => {
                socket.emit('placeTableUpdated', output);
            }).catch((err) => {
                socket.emit('errorMessage', err);
            });
        };
    }

    // search functions
    searchPlaceByName(socket) {
        return (data) => {
            return this.searchService.yelpAutocomplete(data).then((output) => {
                socket.emit('yelpAutocompleteResult', output)
            }).catch((err) => {
                socket.emit('errMessage', err)
            })
        }
    }

    searchPlaceById(socket) {
        return (data) => {
            return this.searchService.yelpIDSearch(data).then((output) => {
                socket.emit('yelpIdResult', output)
            }).catch((err) => {
                socket.emit('errMessage', err)
            })
        }
    }

}

module.exports = SocketIORouter
