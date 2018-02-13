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
        },
        eventInfo: {
            id: 1,
        },
        place: {
            yelpId: 'fairwood',
            placeName: "Fairwood"
        }
    }

    let placeToBeVote = {
        userInfo: {
            id: 1,
        },
        eventInfo: {
            id: 2,
        },
        place: {
            placeId: 4
        }
    }

    let placeToBeDevote = {
        userInfo: {
            id: 1,
        },
        eventInfo: {
            id: 2,
        },
        place: {
            placeId: 4
        }
    }


    let userEventInfo = {
        userInfo: {
            id: 1,
        },
        eventInfo: {
            id: 1,
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
        votePlaceService.votePlaceIncrease(placeToBeVote).then((output) => {
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
        votePlaceService.votePlaceDecrease(placeToBeDevote).then((output) => {
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

