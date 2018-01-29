module.exports = class SearchPlaceRouter{
    constructor(io,searchService){
        this.io =io,
        this.searchService= searchService
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
        // console.log('enter')
        // socket.on ('search',data=>console.log(data))
        socket.on('searchPlaceByName',this.searchPlaceByName(socket).bind(this));
        // socket.on('placeVoteIncrease',this.votePlaceIncrease(socket).bind(this));
        // socket.on('placeVoteDecrease',this.votePlaceDecrease(socket).bind(this));
        // socket.on('listAllPlacesByEvent',this.listAllPlacesByEvent(socket).bind(this));
    }

    searchPlaceByName(socket){
        return(data)=>{
            return this.searchService.yelpAutocomplete(data).then((output)=>{
                socket.emit('yelpAutocompleteResult',output)
            }).catch((err)=>{
                socket.emit('errMessage',err)
            })
        }
    }
}