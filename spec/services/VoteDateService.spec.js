const { VoteDateService } = require('../../services');
const UserModel = require('../../models').users;
const UserEventModel = require('../../models').userEvents;
const DateModel = require('../../models').dates;
const VoteDateModel = require('../../models').voteDates;

describe("VoteDateService",() => {

    // let dateToBeAdded = {
    //     userInfo: {
    //         id: 2,
    //         facebookId: '11112',
    //         username: 'Jason',
    //     },
    //     eventId: 1,
    //     eventUrl: 'itdog',
    //     date: new Date(2017,2,26).getTime()
    // }

    // let dateToBeVote = {
    //     userInfo: {
    //         id: 1,
    //         facebookId: '11111',
    //         username: 'Dickson',
    //     },
    //     eventId: 2,
    //     eventUrl: 'itdog',
    //     dateId: 4
    // }

    // // let dateToBeDevote = {
    // //     userInfo: {
    // //         id: 1,
    // //         facebookId: '11111',
    // //         username: 'Dickson',
    // //     },
    // //     eventId: 2,
    // //     eventUrl: 'itdog',
    // //     dateId: 4
    // // }

    let userEventInfo = {
        userInfo: {
            userId: 1,
            facebookId: '11111',
            username: 'Dickson',
        },
        eventInfo: {
            eventId: 1,
            eventUrl: 'itdog',
        }
    }

    let dateToBeAdded = {
        userInfo: {
            userId: 2,
            facebookId: '11112',
            username: 'Jason',
        },
        eventInfo: {
            eventId: 1,
            eventUrl: 'itdog2',
        },
        date: new Date(2017,2,26).getTime()
    }

    let dateToBeVote = {
        userInfo: {
            userId: 1,
            facebookId: '11111',
            username: 'Dickson',
        },
        eventInfo: {
            eventId: 2,
            eventUrl: 'itdog2'
        },
        date: {
            dateId: 4
        }
    }

    let dateToBeDevote = {
        userInfo: {
            userId: 1,
            facebookId: '11111',
            username: 'Dickson',
        },
        eventInfo: {
            eventId: 2,
            eventUrl: 'itdog2'
        },
        date: {
            dateId: 4
        }
    }

    const voteDateService = new VoteDateService();

    it("should list the dates in database by specific event",(done)=>{
        voteDateService.listAllDatesByEvent(userEventInfo).then((output) => {
            expect(output.length).toBe(3);
            done();
        });
    });

    it("should create a dates in database by specific event",(done) => {
        voteDateService.createDate(dateToBeAdded).then((output) => {
            expect(output.length).toBe(4);
            done();
        });
    });

    it("should vote a selection",(done)=>{
        voteDateService.dateVoteIncrease(dateToBeVote).then((output) => {
            let record = output.filter((item) => {
                return item.id === dateToBeVote.date.dateId;
            });
            expect(output.length).toBe(3);
            expect(record[0].num_of_ppl).toBe(3);
            expect(record[0].id).toBe(dateToBeVote.date.dateId);
            expect(record[0].counter).toBe(1);
            expect(record[0].voted).toBe(true);
            done();
        });
    });

    it("should devote a selection",(done)=>{
        voteDateService.dateVoteDecrease(dateToBeDevote).then((output) => {

            let record = output.filter((item) => {
                return item.id === dateToBeDevote.date.dateId
            });
            
            expect(output.length).toBe(3);
            expect(record[0].num_of_ppl).toBe(2);
            expect(record[0].id).toBe(dateToBeDevote.date.dateId);
            expect(record[0].counter).toBe(0);
            expect(record[0].voted).toBe(false);
            done();
        });
    });
});