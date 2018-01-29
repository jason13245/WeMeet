class VoteDateRouter{

    constructor(io,voteDateService){
        this.io = io;
        this.voteDateService = voteDateService;
    }

    router(){
        this.io.on('connection',this.connection.bind(this));
    }
    // router(){
    //     this.io.use((socket, next)=>{
    //         if(!socket.session.passport){
    //             socket.disconnect();
    //         }else{
    //             next();
    //         }
    //     });
    //     this.io.on('connection',this.connection.bind(this));
    // }

    connection(socket){
<<<<<<< HEAD
        console.log('entered');
        socket.emit('connected',"success");
        //socket.emit('username', socket.session.passport.user);
        socket.on('send',data=>console.log(data));
=======
        socket.emit('username', socket.session.passport.user);
>>>>>>> 31b09e9cc464c0706986975608f573a52f060cad
        socket.on('dateCreated',this.createDate(socket).bind(this));
        socket.on('dateVoteIncrease',this.dateVoteIncrease(socket).bind(this));
        socket.on('dateVoteDecrease',this.dateVoteDecrease(socket).bind(this));
        socket.on('listAllDatesByEvent',this.listAllDatesByEvent(socket).bind(this));
    }

    createDate(socket){
        return (data)=>{
            return this.voteDateService.createDate(data).then((output)=>{
                // this.io.to("event_" + data.event_url).emit('date_table_updated', output);
                //console.log(output);
                socket.emit('dateTableUpdated', output);
            }).catch((err) => {
                socket.to("event_" + data.eventUrl).emit('error_message_for_date', err);
            });
        };
    }

    dateVoteIncrease(socket){
        return (data)=>{
            return this.voteDateService.dateVoteIncrease(data).then((output)=>{
                socket.emit('dateTableUpdated', output);
            }).catch((err) => {
                socket.to("event_" + data.eventUrl).emit('error_message_for_date', err);
            });
        };
    }

    dateVoteDecrease(socket){
        return (data)=>{
            return this.voteDateService.dateVoteDecrease(data).then((output)=>{
                socket.emit('dateTableUpdated', output);
            }).catch((err) => {
                socket.to("event_" + data.eventUrl).emit('error_message_for_date', err);
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
                socket.emit('dateTableUpdated', dates);
            }).catch((err) => {
                socket.emit('errorMssageForDate', err);
            });
            
        };
    }
}

module.exports = VoteDateRouter