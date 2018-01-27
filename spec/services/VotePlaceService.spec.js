const { VotePlaceService } = require('../../services');
const UserModel = require('../../models').users;
const UserEventModel = require('../../models').userEvents;
const PlaceModel = require('../../models').places;
const VotePlaceModel = require('../../models').votePlaces;

describe("VoteDateService",() => {
    // Add fake user object
    let placeToBeAdded = {
        userInfo: {
            id: 2,
            facebookId: '11112',
            username: 'Jason',
        },
        eventId: 1,
        eventUrl: 'itdog',
        yelpId: 'fairwood',
        placeName: "Fairwood"
    }

    let placeToBeVote = {
        userInfo: {
            id: 1,
            facebookId: '11111',
            username: 'Dickson',
        },
        eventId: 1,
        eventUrl: 'itdog',
        placeId: 1
    }

    let placeToBeDevote = {
        userInfo: {
            id: 1,
            facebookId: '11111',
            username: 'Dickson',
        },
        eventId: 2,
        eventUrl: 'itdog',
        placeId: 4
    }


    let userEventInfo = {
        userInfo: {
            id: 1,
            facebookId: '11111',
            username: 'Dickson',
        },
        eventId: 1,
        eventUrl: 'itdog'
    }

    const votePlaceService = new VotePlaceService();


    it("should list the places in database by specific event",(done)=>{
        votePlaceService.listAllPlacesByEvent(userEventInfo.userInfo, userEventInfo).then((output) => {
            expect(output.length).toBe(2);
            done();
        });
    });

    it("should create a place in database for specific event",(done)=>{
        votePlaceService.createPlace(placeToBeAdded.userInfo, placeToBeAdded).then((output) => {
            expect(output.length).toBe(3);
            done();
        });
    });

    it("should vote a selection",(done)=>{
        votePlaceService.placeVoteIncrease(placeToBeVote.userInfo, placeToBeVote).then((output) => {
            expect(output.length).toBe(3);

            let record = output.filter((item) => {
                return item.id === placeToBeVote.placeId || item.placeName === placeToBeVote.placeName
            });

            expect(record[0].id).toBe(placeToBeVote.placeId);
            expect(record[0].counter).toBe(3);
            expect(record[0].voted).toBe(true);
            done();
        });
    });

    it("should devote a selection",(done)=>{
        votePlaceService.placeVoteDecrease(placeToBeDevote.userInfo, placeToBeDevote).then((output) => {
            expect(output.length).toBe(2);

            let record = output.filter((item) => {
                return item.id === placeToBeDevote.placeId || item.placeName === placeToBeDevote.placeName
            });

            expect(record[0].id).toBe(placeToBeDevote.placeId);
            expect(record[0].counter).toBe(1);
            expect(record[0].voted).toBe(false);
            done();
        });
    });
});

