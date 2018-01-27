const { VoteDateService } = require('../../services');
const UserModel = require('../../models').users;
const UserEventModel = require('../../models').userEvents;
const DateModel = require('../../models').dates;
const VoteDateModel = require('../../models').voteDates;

describe("VoteDateService",() => {

    // Add fake user object
    let userInfo = {
        id: 1,
        facebookId: '11112',
        name: 'Dickson',
        createdAt: new Date(),
        updatedAt: new Date()
    };

    // Add fake event object
    let eventInfo = {
        event_id: 1,
        event_url: 'test-url',
        createdAt: new Date(),
        updatedAt: new Date()
    };

    // Add fake userEvent object
    let userEventInfo = {
        id: 2,
        userId: 1,
        eventId: 1,
        isJoin: true
    };

    // First date object to be added on the event
    let dateObject = {
        event_id: 1,
        event_url: 'test-url',
        date: new Date(2017,2,18),
        createdAt: new Date(),
        updatedAt: new Date()
    };

    // Second date object to be added on the event
    let anotherDateObject = {
        event_id: 1,
        event_url: 'test-url',
        date: new Date(2017,2,25),
        createdAt: new Date() + 30000,
        updatedAt: new Date() + 30000
    };

    let dateObjectToVote = {
        event_id: 1,
        date_id: 1,
        createdAt: new Date(2017,2,13),
        updatedAt: new Date(2017,2,13)
    };

    let dateObjectToDevote = {
        event_id: 1,
        date_id: 1,
        createdAt: new Date(2017,2,13),
        updatedAt: new Date(2017,2,13)
    };

    beforeAll((done)=>{
        voteDateService = new VoteDateService();
        VoteDateModel.destroy({
            where: {}
        }).then(() => {
            done();
        });
        UserEventModel.create(userEventInfo)
        .then(() => {
            done();
        });
    });

    xit("should list the dates in database by specific event",(done)=>{
        voteDateService.createDate(userInfo, dateObject)
        .then(() => {
            voteDateService.listAllDatesByEvent(userInfo, eventInfo).then((output) => {
                expect(output.length).toBe(1);
                done();
            });
        });
    });

    xit("should vote a selection",(done)=>{
        voteDateService.dateVoteIncrease(userInfo, dateObjectToVote).then((output) => {
            expect(output.length).toBe(1);
            expect(output[0].num_of_ppl).toBe(1);
            expect(output[0].id).toBe(dateObjectToVote.date_id);
            expect(output[0].counter).toBe(1);
            expect(output[0].voted).toBe(true);
            done();
        });
    });

    xit("should devote a selection",(done)=>{
        voteDateService.dateVoteDecrease(userInfo, dateObjectToDevote).then((output) => {
            expect(output.length).toBe(1);
            expect(output[0].num_of_ppl).toBe(0);
            expect(output[0].id).toBe(dateObjectToDevote.date_id);
            expect(output[0].counter).toBe(0);
            expect(output[0].voted).toBe(false);
            done();
        });
    });
});