const { EventService } = require('../../services');
const EventModel = require('../../models').events;

describe("EventService",() => {

    let userInfo = {
        userId: 1
    }

    let eventToBeAdded = {
        userInfo: {
            userId: 1
        },
        eventInfo: {
            eventType: 1,
            eventName: 'itdog3'
        }
    }
    const eventService = new EventService();

    it('should show all event list for user', (done) => {
        eventService.listAllEventsByUser(userInfo.userId).then((result) => {
            expect(result.creates.length).toBe(2);
            expect(result.invited.length).toBe(0);
            done();
        });
    });

    it('should create for user', (done) => {
        eventService.createEvent(eventToBeAdded.userInfo.userId, eventToBeAdded.eventInfo).then((result) => {
            expect(result.creates.length).toBe(3);
            expect(result.invited.length).toBe(0);
            done();
        });
    });


});