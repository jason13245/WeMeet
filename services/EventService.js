const EventModel = require('../models').events;
const UserModel = require('../models').users;
const UserEventModel = require('../models').userEvents;
const uuidv1 = require('uuid/v1');

module.exports = class EventService{
    listAllEventsByUser(userId) {
        return UserModel.findOne({
            where: {
                id: userId
            },
            include: [
                {
                    model: EventModel,
                    as: 'creates',
                    order: [
                        [EventModel, 'createdAt', 'ASC']
                    ]
                },
                {
                    model: EventModel,
                    as: 'invited',
                    order: [
                        [EventModel, 'createdAt', 'ASC']
                    ]
                },
            ]
        }).then((user) => {
            let result = {};

            result.id = user.id;
            result.username = user.username;
            result.facebookId = user.facebookId;
            result.createdAt = user.createdAt;
            result.updatedAt = user.updatedAt;
            result.creates = user.creates.sort((a,b) => {
                return a.createdAt - b.createdAt;
            });

            result.invited = user.invited.filter(event => {
                return event.createdBy !== user.id;
            }).sort((a,b) => {
                return a.createdAt - b.createdAt;
            });
            return result;
        });
    }

    createEvent(userId, eventData){
        let event = new EventModel();
        event.createdBy = userId;
        event.eventName = eventData.eventName;
        event.url = uuidv1();
        event.eventType = eventData.eventType;

        return event.save().then((event)=>{
            let userEvent = new UserEventModel();
            userEvent.userId = userId;
            userEvent.eventId = event.id;
            userEvent.isJoin = true;

            return userEvent.save().then((userEvent)=>{
                //this.sendGreetingMessage(userEvent.eventId);
                return this.listAllEventsByUser(userEvent.userId);
            }).catch(err => console.log(err));
        }).catch(err => console.log(err));
    }

    sendGreetingMessage(eventId) {
        let initMessageObj = {
            content: 'This is the first message. Enjoy!',
            date: new Date().getTime()
        };
        // Update Event History
        client.rpush('eventHistoryOf'+ eventId,JSON.stringify(initMessageObj),(err ,reply) => {
            if(reply){
                return event;
            }
        });
    }
}