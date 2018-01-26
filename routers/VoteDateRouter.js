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
        socket.on('date_created',this.createDate(socket).bind(this));
        socket.on('date_vote_increase',this.dateVoteIncrease(socket).bind(this));
        socket.on('date_vote_decrease',this.dateVoteDecrease(socket).bind(this));
        socket.on('list_all_dates_by_event',this.listAllDatesByEvent(socket).bind(this));
    }

    createDate(socket){
        return (data)=>{
            return this.voteDateService.createDate(data).then((output)=>{
                this.io.to("event_" + data.event_url).emit('date_table_updated', output);
            }).catch((err) => {
                this.io.to("event_" + data.event_url).emit('error_message_for_date', err);
            });
        };
    }

    dateVoteIncrease(socket){
        return (data)=>{
            return this.voteDateService.dateVoteIncrease(data).then((output)=>{
                this.io.to("event_" + data.event_url).emit('date_table_updated', output);
            }).catch((err) => {
                this.io.to("event_" + data.event_url).emit('error_message_for_date', err);
            });
        };
    }

    dateVoteDecrease(socket){
        return (data)=>{
            return this.voteDateService.dateVoteDecrease(data).then((output)=>{
                this.io.to("event_" + data.event_url).emit('date_table_updated', output);
            }).catch((err) => {
                this.io.to("event_" + data.event_url).emit('error_message_for_date', err);
            });
        };
    }

    listAllDatesByEvent(socket){
        return (data)=>{
            return this.voteDateService.listAllDatesByEvent(data).then((dates)=>{
                this.io.to("event_" + data.event_url).emit('date_table_updated', output);
            }).catch((err) => {
                this.io.to("event_" + data.event_url).emit('error_message_for_date', err);
            });
        };
    }
}

module.exports = VoteDateRouter