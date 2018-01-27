const { VotePlaceService } = require('../../services');
const UserModel = require('../../models').users;
const UserEventModel = require('../../models').userEvents;
const PlaceModel = require('../../models').places;
const VotePlaceModel = require('../../models').votePlaces;

describe("VoteDateService",() => {
    // Add fake user object
    let placeToBeAdded = {
        userInfo: {
            userId: 2,
            facebookId: '11112',
            username: 'Jason',
        },
        eventInfo: {
            eventId: 1,
            eventUrl: 'itdog',
        },
        place: {
            yelpId: 'fairwood',
            placeName: "Fairwood"
        }
    }

    let placeToBeVote = {
        userInfo: {
            userId: 1,
            facebookId: '11111',
            username: 'Dickson',
        },
        eventInfo: {
            eventId: 2,
            eventUrl: 'itdog2',
        },
        place: {
            placeId: 4
        }
    }

    let placeToBeDevote = {
        userInfo: {
            userId: 1,
            facebookId: '11111',
            username: 'Dickson',
        },
        eventInfo: {
            eventId: 2,
            eventUrl: 'itdog2',
        },
        place: {
            placeId: 4
        }
    }


    let userEventInfo = {
        userInfo: {
            userId: 1,
            facebookId: '11111',
            username: 'Dickson',
        },
        eventInfo: {
            eventId: 1,
            eventUrl: 'itdog'
        }
    }

    const votePlaceService = new VotePlaceService();


    it("should list the places in database by specific event",(done)=>{
        votePlaceService.listAllPlacesByEvent(userEventInfo).then((output) => {
            expect(output.length).toBe(2);
            done();
        });
    });

    it("should create a place in database for specific event",(done)=>{
        votePlaceService.createPlace(placeToBeAdded).then((output) => {
            expect(output.length).toBe(3);
            done();
        });
    });

    it("should vote a selection",(done)=>{
        votePlaceService.placeVoteIncrease(placeToBeVote).then((output) => {
            expect(output.length).toBe(2);

            let record = output.filter((item) => {
                return item.id === placeToBeVote.place.placeId
            });

            expect(record[0].id).toBe(placeToBeVote.place.placeId);
            expect(record[0].counter).toBe(3);
            expect(record[0].voted).toBe(true);
            done();
        });
    });

    it("should devote a selection",(done)=>{
        votePlaceService.placeVoteDecrease(placeToBeDevote).then((output) => {
            expect(output.length).toBe(2);

            let record = output.filter((item) => {
                return item.id === placeToBeDevote.place.placeId
            });

            expect(record[0].id).toBe(placeToBeDevote.place.placeId);
            expect(record[0].counter).toBe(1);
            expect(record[0].voted).toBe(false);
            done();
        });
    });
});

