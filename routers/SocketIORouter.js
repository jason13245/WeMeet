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



    connection(socket) {
        //socket.emit('username', socket.session.passport.user);

        console.log('connected socket')
        //enter event room
            socket.on("enter-event", this.enterEvent(socket).bind(this));
            //socket.to("event" + data.eventInfo.id)

            // chatroom

            // socket.on('set-nickname', (nickname) => {
            //     socket.nickname = nickname;
            //     this.io.in("event" + data.eventInfo.id).emit('users-changed', { user: nickname, event: 'joined' });
            // });
            socket.on('get-history', (data) => {
                console.log(data);
                this.chatroomService.getMsg(data.userInfo.username, data.eventInfo.id, (result) => {
                    result.forEach(function (element) {
                        var array = element.slice(1, -1).replace(/"/g, "").split(",");
                        this.io.to(socket.id).emit('message', { text: array[1], from: array[0], created: array[2] });
                    }, this);
                })
            });

            socket.on('leave-event', this.leaveEvent(socket).bind(this));

            socket.on('add-message', (data) => {
                this.chatroomService.storeMsg(data.eventInfo.id,data.userInfo.username, data.text, data.time);
                this.io.in("event" + data.eventInfo.id).emit('message', { text: data.text, from: data.userInfo.username, created: data.time });
            });

            // date
            socket.on('dateCreated', this.createDate().bind(this));

            socket.on('dateVoteIncrease', this.dateVoteIncrease().bind(this));

            socket.on('dateVoteDecrease', this.dateVoteDecrease().bind(this));

            socket.on('listAllDatesByEvent', this.listAllDatesByEvent(socket).bind(this));

            socket.on('getNewDates',this.listAllDatesByEvent(socket).bind(this));

            //place
            socket.on('createPlace', this.createPlace().bind(this));

            socket.on('placeVoteIncrease', this.votePlaceIncrease().bind(this));

            socket.on('placeVoteDecrease', this.votePlaceDecrease().bind(this));

            socket.on('listAllPlacesByEvent', this.listAllPlacesByEvent().bind(this));

            //search
            socket.on('searchPlaceByName', this.searchPlaceByName(socket).bind(this));

            socket.on('searchPlaceById', this.searchPlaceById(socket).bind(this));

        
    }

    enterEvent(socket) {
        return (data)=>{
            socket.join("event" + data.id);
            console.log('User joined event' + data.id);
        };
    }

    leaveEvent(socket) {
        return (data)=>{
            console.log(data);                
            socket.leave("event" + data.id);
            console.log('User leave event' + data.id);
        };
    }

    //place functions
    createPlace() {
        return (data) => {
            return this.votePlaceService.createPlace(data).then((output) => {
                this.io.in("event" + data.eventInfo.id).emit('placeTableUpdated', output);
            }).catch((err) => {
                this.io.in("event" + data.eventInfo.id).emit('errorMessage', err);
            });
        };
    }

    votePlaceIncrease() {
        return (data) => {
            return this.votePlaceService.votePlaceIncrease(data).then((output) => {
                this.io.in("event" + data.eventInfo.id).emit('placeTableUpdated', output);
            }).catch((err) => {
                this.io.in("event" + data.eventInfo.id).emit('errorMessage', err);
            });
        };
    }

    votePlaceDecrease() {
        return (data) => {
            return this.votePlaceService.votePlaceDecrease(data).then((output) => {
                this.io.in("event" + data.eventInfo.id).emit('placeTableUpdated', output);
            }).catch((err) => {
                this.io.in("event" + data.eventInfo.id).emit('errorMessage', err);
            });
        };
    }

    listAllPlacesByEvent() {
        return (data) => {
            return this.votePlaceService.listAllPlacesByEvent(data).then((output) => {
                this.io.in("event" + data.eventInfo.id).emit('placeTableUpdated', output);
            }).catch((err) => {
                this.io.in("event" + data.eventInfo.id).emit('errorMessage', err);
            });
        };
    }

    //date functions
    createDate() {
        return (data) => {
            return this.voteDateService.createDate(data).then((output) => {
                this.io.in("event" + data.eventInfo.id).emit('dateTableNeedUpdate', output);
            }).catch((err) => {
                this.io.in("event" + data.eventInfo.id).emit('error_message_for_date', err);
            });
        };
    }

    dateVoteIncrease() {
        return (data) => {
            return this.voteDateService.dateVoteIncrease(data).then((output) => {
                this.io.in("event" + data.eventInfo.id).emit('dateTableNeedUpdate', output);
            }).catch((err) => {
                this.io.in("event" + data.eventInfo.id).emit('error_message_for_date', err);
            });
        };
    }

    dateVoteDecrease() {
        return (data) => {
            return this.voteDateService.dateVoteDecrease(data).then((output) => {
                this.io.in("event" + data.eventInfo.id).emit('dateTableNeedUpdate', output);
            }).catch((err) => {
                this.io.in("event" + data.eventInfo.id).emit('error_message_for_date', err);
            });
        };
    }

    listAllDatesByEvent(socket) {
        return (data) => {
            return this.voteDateService.listAllDatesByEvent(data).then((output) => {
                this.io.to(socket.id).emit('sendingDatesTable', output);
            }).catch((err) => {
                this.io.to(socket.id).emit('error_message_for_date', err);
            });
        };
    }

    // search functions
    searchPlaceByName(socket) {
        return (data) => {
            return this.searchService.yelpAutocomplete(data).then((output) => {
                this.io.to(socket.id).emit('yelpAutocompleteResult', output)
            }).catch((err) => {
                this.io.to(socket.id).emit('errMessage', err)
            })
        }
    }

    searchPlaceById(socket) {
        return (data) => {
            return this.searchService.yelpIDSearch(data).then((output) => {
                this.io.to(socket.id).emit('yelpIdResult', output)
            }).catch((err) => {
                this.io.to(socket.id).emit('errMessage', err)
            })
        }
    }

}

module.exports = SocketIORouter
