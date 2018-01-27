class VoteDateRouter{

    constructor(io){
        this.io = io;
        this.voteDateService = voteDateService;
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
        socket.on('dateCreated',this.createDate(socket).bind(this));
        socket.on('dateVoteIncrease',this.dateVoteIncrease(socket).bind(this));
        socket.on('dateVoteDecrease',this.dateVoteDecrease(socket).bind(this));
        socket.on('listAllDatesByEvent',this.listAllDatesByEvent(socket).bind(this));
    }

    createDate(socket){
        return (data)=>{
            return this.voteDateService.createDate(data).then((output)=>{
                socket.to("event_" + data.event_url).emit('date_table_updated', output);
            }).catch((err) => {
                socket.to("event_" + data.event_url).emit('error_message_for_date', err);
            });
        };
    }

    dateVoteIncrease(socket){
        return (data)=>{
            return this.voteDateService.dateVoteIncrease(data).then((output)=>{
                socket.to("event_" + data.event_url).emit('date_table_updated', output);
            }).catch((err) => {
                socket.to("event_" + data.event_url).emit('error_message_for_date', err);
            });
        };
    }

    dateVoteDecrease(socket){
        return (data)=>{
            return this.voteDateService.dateVoteDecrease(data).then((output)=>{
                socket.to("event_" + data.event_url).emit('date_table_updated', output);
            }).catch((err) => {
                socket.to("event_" + data.event_url).emit('error_message_for_date', err);
            });
        };
    }

    listAllDatesByEvent(socket){
        return (data)=>{
            return this.voteDateService.listAllDatesByEvent(data).then((dates)=>{
                socket.to("event_" + data.event_url).emit('date_table_updated', output);
            }).catch((err) => {
                socket.to("event_" + data.event_url).emit('error_message_for_date', err);
            });
        };
    }
}

module.exports = VoteDateRouter