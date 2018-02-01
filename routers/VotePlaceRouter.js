module.exports = class VotePlaceRouter{

    constructor(io, votePlaceService){
        this.io = io;
        this.votePlaceService = votePlaceService;
    }

    router(){
        // this.io.use((socket, next)=>{
        //     if(!socket.session.passport){
        //         socket.disconnect();
        //     }else{
        //         next();
        //     }
        // });
        this.io.on('connection',this.connection.bind(this));
    }

    connection(socket){
        //socket.emit('username', socket.session.passport.user);
        socket.on('createPlace',this.createPlace(socket).bind(this));
        socket.on('placeVoteIncrease',this.votePlaceIncrease(socket).bind(this));
        socket.on('placeVoteDecrease',this.votePlaceDecrease(socket).bind(this));
        socket.on('listAllPlacesByEvent',this.listAllPlacesByEvent(socket).bind(this));
    }

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
}