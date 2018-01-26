const { VotePlaceService } = require('../../services');
const UserModel = require('../../models').users;
const UserEventModel = require('../../models').userEvents;
const PlaceModel = require('../../models').places;
const VotePlaceModel = require('../../models').votePlaces;

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
        event_name: 'test_event',
        event_url: 'test-url',
        createdAt: new Date(),
        updatedAt: new Date()
    };

    // Add fake userEvent object
    let userEventInfo = {
        id: 1,
        userId: 1,
        eventId: 1,
        isJoin: true
    };

    // First place object to be added on the event
    let placeObject = {
        place_id: 1,
        event_url: 'test-url',
        yelp_id: 'mc-donalds',
        place_name: `Mc Donald's`,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    // Another place object to be added on the event
    let anotherPlaceObject = {
        place_id: 2,
        event_url: 'test-url',
        yelp_id: 'kfc',
        place_name: `KFC`,
        createdAt: new Date(),
        updatedAt: new Date()
    };

    // The place object to be voted on the event
    let placeObjectToVote = {
        event_id: 1,
        place_id: 1,
        createdAt: new Date(2017,2,13),
        updatedAt: new Date(2017,2,13)
    };

    // The place object to be devoted on the event
    let placeObjectToDevote = {
        event_id: 1,
        place_id: 1,
        createdAt: new Date(2017,2,13),
        updatedAt: new Date(2017,2,13)
    };

    beforeAll((done)=>{
        votePlaceService = new VotePlaceService();
        VotePlaceModel.destroy({
            where: {}
        }).then(() => {
            done();
        });
        UserEventModel.create(userEventInfo)
        .then(() => {
            done();
        });
    });

    it("should list the places in database by specific event",(done)=>{
        voteDateService.createPlace(userInfo, dateObject)
        .then(() => {
            voteDateService.listAllPlacesByEvent(userInfo, eventInfo).then((output) => {
                expect(output.length).toBe(1);
                done();
            });
        });
    });

    it("should vote a selection",(done)=>{
        votePlaceService.placeVoteIncrease(userInfo, placeObjectToVote).then((output) => {
            expect(output.length).toBe(1);
            expect(output[0].num_of_ppl).toBe(1);
            expect(output[0].id).toBe(placeObjectToVote.place_id);
            expect(output[0].yelpId).toBe(placeObject.yelp_id);
            expect(output[0].placename).toBe(placeObject.place_name);
            expect(output[0].counter).toBe(1);
            expect(output[0].voted).toBe(true);
            done();
        });
    });

    it("should devote a selection",(done)=>{
        votePlaceService.placeVoteDecrease(userInfo, placeObjectToDevote).then((output) => {
            expect(output.length).toBe(1);
            expect(output[0].num_of_ppl).toBe(1);
            expect(output[0].id).toBe(placeObjectToDevote.place_id);
            expect(output[0].yelpId).toBe(placeObject.yelp_id);
            expect(output[0].placename).toBe(placeObject.place_name);
            expect(output[0].counter).toBe(1);
            expect(output[0].voted).toBe(false);
            done();
        });
    });
});

