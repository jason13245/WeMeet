const { VoteDateService } = require('../../services');
const UserModel = require('../models').users;
const UserEventModel = require('../models').userEvents;
const DateModel = require('../models').dates;
const VoteDateModel = require('../models').voteDates;

describe("VoteDateService",() => {
    let userInfo = {
        id: 1,
        facebookId: '11111111',
        name: 'Test User'
    };

    let eventInfo = {
        event_id: 1,
        event_url: 'test-url'
    };

    let dateObjectToAdd = {
        event_id: 1,
        event_url: 'test-url',
        date: new Date().getTime()
    };

    let anotherDateObjectToAdd = {
        event_id: 1,
        event_url: 'test-url',
        date: new Date().getTime() + 30000
    };

    let dateObjectToVote = {
        event_id: 1,
        event_url: 'test-url',
        checkbox_id: 1
    };

    let dateObjectToDevote = {
        event_id: 1,
        event_url: 'test-url',
        checkbox_id: 1
    };

    beforeEach((done)=>{
        voteDateService = new VoteDateService();
        VoteDateModel.destroy({
            where: {}
        }).then(() => {
            done();
        });
    });

    it("should list the dates in database by specific event",(done)=>{
        voteDateService.createDate(dateObjectToAdd).then(output => {
            voteDateService.listAllDatesByEvent(data).then(output => {
                expect(output.length).toBe(1);
                done();
            });
        });
    });

    it("should create a date record to database",(done)=>{
        voteDateService.createDate(anotherDateObjectToAdd).then(output => {
            expect(output.length).toBe(2);
            done();
        });
    });

    it("should create a date record to database",(done)=>{
        voteDateService.createDate(data).then(output => {
            expect(output.length).toBe(2);
            done();
        });
    });

    it("should throw an error if the same datetime is selected by user",(done)=>{
        voteDateService.createDate(data).then(output => {
            expect(output.length).toBe(2);
            done();
        });
    });

    xit("should vote a selection",(done)=>{
        voteDateService.dateVoteIncrease(dateObjectToVote).then(output => {
            expect(output.length).toBe(2);

            VoteDateModel.findOne({
                where: {
                    dateId: dateObjectToVote.id
                }
            }).then((voteDate) => {
                let selectedOutput = output.filter(result => voteDate.id === result.id);
                expect(selectedOutput[0].voted).toBe('checked');
                done();
            })
            .catch(err => err);
        });
    });

    xit("should devote a selection",(done)=>{
        voteDateService.dateVoteDecrease(dateObjectToDevote).then(output => {
            expect(output.length).toBe(2);

            VoteDateModel.findOne({
                where: {
                    dateId: dateObjectToVote.id
                }
            }).then((voteDate) => {
                let selectedOutput = output.filter(result => voteDate.id === result.id);
                expect(selectedOutput[0].voted).toBe('checked');
                done();
            })
            .catch(err => err);
        });
    });
});