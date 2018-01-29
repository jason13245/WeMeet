module.exports = class VotePlaceRouter{

    constructor(io){
        this.io = io;
        this.votePlaceService = votePlaceService;
    }

    router(){
        this.io.use((socket, next)=>{
            if(!socket.session.passport){
                socket.disconnect();
            }else{
                next();
            }
        });
        this.io.on('connection',this.connection.bind(this));
    }

    connection(socket){
        socket.emit('username', socket.session.passport.user);
        socket.on('createPlace',this.createPlace(socket).bind(this));
        socket.on('placeVoteIncrease',this.placePlaceIncrease(socket).bind(this));
        socket.on('placeVoteDecrease',this.placePlaceDecrease(socket).bind(this));
        socket.on('listAllPlacesByEvent',this.listAllPlacesByEvent(socket).bind(this));
    }

    createPlace(socket){
        return (user, data)=>{
            return this.votePlaceService.createPlace(data).then((output)=>{
                socket.to("event" + data.eventId).emit('placeTableUpdated', output);
            }).catch((err) => {
                socket.to("event" + data.eventId).emit('errorMessage', err);
            });
        };
    }

    placePlaceIncrease(socket){
        return (data)=>{
            return this.votePlaceService.placeVoteIncrease(data).then((output)=>{
                socket.to("event" + data.eventId).emit('placeTableUpdated', output);
            }).catch((err) => {
                socket.to("event" + data.eventId).emit('errorMessage', err);
            });
        };
    }

    placePlaceDecrease(socket){
        return (data)=>{
            return this.votePlaceService.placePlaceDecrease(data).then((output)=>{
                socket.to("event" + data.eventId).emit('placeTableUpdated', output);
            }).catch((err) => {
                socket.to("event" + data.eventId).emit('errorMessage', err);
            });
        };
    }

    listAllPlacesByEvent(socket){
        return (data)=>{
            return this.votePlaceService.listAllPlacesByEvent(data).then((places)=>{
                socket.to("event" + data.eventId).emit('place_table_upplaced', output);
            }).catch((err) => {
                socket.to("event" + data.eventId).emit('errorMessage', err);
            });
        };
    }
}