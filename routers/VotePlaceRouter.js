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
        socket.on('create_place',this.createPlace(socket).bind(this));
        socket.on('place_vote_increase',this.placePlaceIncrease(socket).bind(this));
        socket.on('place_vote_decrease',this.placePlaceDecrease(socket).bind(this));
        socket.on('list_all_places_by_event',this.listAllPlacesByEvent(socket).bind(this));
    }

    /*

    Event : 'create_place' - Create Place for event

    Function : createPlace(dataObject)
    
    Parameters :
        1. dataObject
            I. user_info - Current User Infomation form JWT 
            II. event_id - Current event ID
            III. event_url - Event URL for seperate chatrooms
            IV. yelp_id - Yelp ID from Yelp API
            V. yelp_place_name  - Yelp ID from Yelp API
    
    Example : 

    data = {
        user_info: {
            id: 1,
            facebookId: '11112',
            name: 'Example User',
            createdAt: <timestamp>,
            updatedAt: <timestamp>
        },
        event_id: 1
        event_url: 'example_url',
        yelp_id: 'mc-donalds'
        yelp_place_name: "Mc Donald's"
    }
    */

    createPlace(socket){
        return (user, data)=>{
            return this.votePlaceService.createPlace(data.user_info, data).then((output)=>{
                this.io.to("event_" + data.event_url).emit('place_table_updated', output);
            }).catch((err) => {
                this.io.to("event_" + data.event_url).emit('error_message', err);
            });
        };
    }

    /*

    Event : 'place_vote_increase' - Vote a place

    Function : placeVoteIncrease(dataObject)
    
    Parameters :
        1. dataObject
            I. user_info - Current User Infomation form JWT
            II. event_id - Current event ID
            III. event_url - Event URL for seperate chatrooms
            IV. place_id - Place ID from Place Table
    
    Example : 

    data = {
        user_info: {
            id: 1,
            facebookId: '11112',
            username: 'Example User',
            createdAt: <timestamp>,
            updatedAt: <timestamp>
        },
        event_id: 1
        event_url: 'example_url',
        place_id: 1
    }

    */

    placePlaceIncrease(socket){
        return (data)=>{
            return this.votePlaceService.placeVoteIncrease(data.user_info, data).then((output)=>{
                this.io.to("event_" + data.event_url).emit('place_table_updated', output);
            }).catch((err) => {
                this.io.to("event_" + data.event_url).emit('error_message', err);
            });
        };
    }

    /*

    Event : 'place_vote_decrease' - Devote a place

    Function : placeVoteDecrease(dataObject)
    
    Parameters :
        1. dataObject
            I. user_info - Current User Infomation form JWT 
            II. event_id - Current event ID
            III. event_url - Event URL for seperate chatrooms
            IV. place_id - Place ID from Place Table

    Example : 

    data = {
        user_info: {
            id: 1,
            facebookId: '11112',
            username: 'Example User',
            createdAt: <timestamp>,
            updatedAt: <timestamp>
        },
        event_id: 1
        event_url: 'example_url',
        place_id: 1
    }
    
    */

    placePlaceDecrease(socket){
        return (data)=>{
            return this.votePlaceService.placePlaceDecrease(data.user_info, data).then((output)=>{
                this.io.to("event_" + data.event_url).emit('place_table_updated', output);
            }).catch((err) => {
                this.io.to("event_" + data.event_url).emit('error_message', err);
            });
        };
    }

    /*
    Event : 'list_all_places_by_event' - List all places in a event

    Function : listAllPlacesByEvent(dataObject)
    
    Parameters :
        1. dataObject
            I. user_info - Current User Infomation form JWT
            II. event_id - Current event ID
            III. event_url - User to seperate chatrooms
    
    Example : 

    data = {
        user_info: {
            id: 1,
            facebookId: '11112',
            username: 'Example User',
            createdAt: <timestamp>,
            updatedAt: <timestamp>
        },
        event_id: 1
        event_url: 'example_url'
    }
    
    */

    listAllPlacesByEvent(socket){
        return (data)=>{
            return this.votePlaceService.listAllPlacesByEvent(data.user_info, data).then((places)=>{
                this.io.to("event_" + data.event_url).emit('place_table_upplaced', output);
            }).catch((err) => {
                this.io.to("event_" + data.event_url).emit('error_message_for_place', err);
            });
        };
    }
}