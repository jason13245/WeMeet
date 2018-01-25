const { VoteDateService } = require('../../services');
const UserModel = require('../../models').users;
const UserEventModel = require('../../models').userEvents;
const DateModel = require('../../models').dates;
const VoteDateModel = require('../../models').voteDates;

describe("VoteDateService",() => {
    let userInfo = {
        id: 1,
        facebookId: '11112',
        name: 'Dickson',
        createdAt: new Date(),
        updatedAt: new Date()
    };

    let eventInfo = {
        event_id: 1,
        event_url: 'test-url',
        createdAt: new Date(),
        updatedAt: new Date()
    };

    let userEventInfo = {
        id: 1,
        userId: 1,
        eventId: 1,
        isJoin: true
    };

    let dateObjectToAdd = {
        event_id: 1,
        event_url: 'test-url',
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date()
    };

    let anotherDateObjectToAdd = {
        event_id: 1,
        event_url: 'test-url',
        date: new Date().getTime() + 30000,
        createdAt: new Date(),
        updatedAt: new Date()
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

    it("should list the dates in database by specific event",(done)=>{
        voteDateService.createDate(userInfo, dateObjectToAdd)
        .then(() => {
            voteDateService.listAllDatesByEvent(userInfo, eventInfo).then((output) => {
                expect(output.length).toBe(1);
                done();
            });
        });
    });

    it("should vote a selection",(done)=>{
        voteDateService.dateVoteIncrease(userInfo, dateObjectToVote).then((output) => {
            expect(output.length).toBe(1);
            expect(output[0].voted).toBe('checked');
            done();
        });
    });

    it("should devote a selection",(done)=>{
        voteDateService.dateVoteDecrease(userInfo, dateObjectToDevote).then((output) => {
            expect(output.length).toBe(1);
            expect(output[0].voted).toBe(null);
            done();
        });
    });
});