const SearchService = require('../services/SearchService')
class SocketIORouter {

    constructor(io, searchService, voteDateService, votePlaceService, chatroomService) {
        this.io = io;
        this.searchService = searchService;
        this.voteDateService = voteDateService;
        this.votePlaceService = votePlaceService;
        this.chatroomService = chatroomService
    }

    router() {
        this.io.on('connection', this.connection.bind(this));
    }



    connection(socket,io) {
        //socket.emit('username', socket.session.passport.user);

        console.log('connected socket')
        //enter event room
        socket.on("enter-event", (data) => {
            console.log('enter event')
            socket.join("event" + data.eventId);
            //socket.to("event" + data.eventId)

            // chatroom
            socket.on('set-nickname', (nickname) => {
                socket.nickname = nickname;
                this.io.in("event" + data.eventId).emit('users-changed', { user: nickname, event: 'joined' });
            });
            socket.on('get-history', (nickname) => {
                this.chatroomService.getMsg(nickname, (result) => {
                    result.forEach(function (element) {
                        var array = element.slice(1, -1).replace(/"/g, "").split(",");
                        this.io.to(socket.id).emit('message', { text: array[1], from: array[0], created: array[2] });
                    }, this);
                })
            });

            socket.on('add-message', (message) => {
                this.chatroomService.storeMsg(socket.nickname, message.text, new Date());
                this.io.in("event" + data.eventId).emit('message', { text: message.text, from: socket.nickname, created: new Date() });
            });

            // date
            socket.on('dateCreated', this.createDate(this.io).bind(this));

            socket.on('dateVoteIncrease', this.dateVoteIncrease(this.io).bind(this));

            socket.on('dateVoteDecrease', this.dateVoteDecrease(this.io).bind(this));

            socket.on('listAllDatesByEvent', this.listAllDatesByEvent(this.io).bind(this));

            //place
            socket.on('createPlace', this.createPlace(this.io).bind(this));

            socket.on('placeVoteIncrease', this.votePlaceIncrease(this.io).bind(this));

            socket.on('placeVoteDecrease', this.votePlaceDecrease(this.io).bind(this));

            socket.on('listAllPlacesByEvent', this.listAllPlacesByEvent(this.io).bind(this));

            //search
            socket.on('searchPlaceByName', this.searchPlaceByName(this.io).bind(this));

            socket.on('searchPlaceById', this.searchPlaceById(this.io).bind(this));

        });
    }

    //place functions
    createPlace(io) {
        return (data) => {
            return this.votePlaceService.createPlace(data).then((output) => {
                io.to("event" + data.eventId).emit('placeTableUpdated', output);
            }).catch((err) => {
                io.to("event" + data.eventId).emit('errorMessage', err);
            });
        };
    }

    votePlaceIncrease(io) {
        return (data) => {
            return this.votePlaceService.votePlaceIncrease(data).then((output) => {
                io.to("event" + data.eventId).emit('placeTableUpdated', output);
            }).catch((err) => {
                io.to("event" + data.eventId).emit('errorMessage', err);
            });
        };
    }

    votePlaceDecrease(io) {
        return (data) => {
            return this.votePlaceService.votePlaceDecrease(data).then((output) => {
                io.to("event" + data.eventId).emit('placeTableUpdated', output);
            }).catch((err) => {
                io.to("event" + data.eventId).emit('errorMessage', err);
            });
        };
    }

    listAllPlacesByEvent(io) {
        return (data) => {
            return this.votePlaceService.listAllPlacesByEvent(data).then((output) => {
                socket.to("event" + data.eventId).emit('placeTableUpdated', output);
            }).catch((err) => {
                socket.to("event" + data.eventId).emit('errorMessage', err);
            });
        };
    }

    //date functions
    createDate(sockioet) {
        return (data) => {
            return this.voteDateService.createDate(data).then((output) => {
                soiocket.to("event" + data.eventId).emit('dateTableUpdated', output);
            }).catch((err) => {
                io.to("event" + data.eventId).emit('error_message_for_date', err);
            });
        };
    }

    dateVoteIncrease(io) {
        return (data) => {
            return this.voteDateService.dateVoteIncrease(data).then((output) => {
                io.to("event" + data.eventId).emit('dateTableUpdated', output);
            }).catch((err) => {
                io.to("event" + data.eventId).emit('error_message_for_date', err);
            });
        };
    }

    dateVoteDecrease(io) {
        return (data) => {
            return this.voteDateService.dateVoteDecrease(data).then((output) => {
                io.to("event" + data.eventId).emit('dateTableUpdated', output);
            }).catch((err) => {
                io.to("event" + data.eventId).emit('error_message_for_date', err);
            });
        };
    }

    listAllDatesByEvent(io) {
        return (data) => {
            return this.voteDateService.listAllDatesByEvent(data).then((dates) => {
                io.to("event" + data.eventId).emit('dateTableUpdated', output);
            }).catch((err) => {
                io.to("event" + data.eventId).emit('error_message_for_date', err);
            });

        };
    }

    // search functions
    searchPlaceByName(io) {
        return (data) => {
            return this.searchService.yelpAutocomplete(data).then((output) => {
                io.to("event" + data.eventId).emit('yelpAutocompleteResult', output)
            }).catch((err) => {
                io.to("event" + data.eventId).emit('errMessage', err)
            })
        }
    }

    searchPlaceById(io) {
        return (data) => {
            return this.searchService.yelpIDSearch(data).then((output) => {
                io.to("event" + data.eventId).emit('yelpIdResult', output)
            }).catch((err) => {
                io.to("event" + data.eventId).emit('errMessage', err)
            })
        }
    }

}

module.exports = SocketIORouter
