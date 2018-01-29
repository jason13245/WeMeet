const VotePlaceRouter = require('../../routers/VotePlaceRouter');

describe('VotePlaceRouter ',()=>{
    let votePlaceRouter;
    let votePlaceService;
    let socket;
    let io;


    let users = [
        {
            first_name: "John",
            last_name : "Doe",
            email : "john.doe@gmail.com"
        }
    ]

    let placeToBeAdded = {
        userInfo: {
            userId: 2,
        },
        eventInfo: {
            eventId: 1,
        },
        place: {
            yelpId: 'fairwood',
            placeName: "Fairwood"
        }
    }

    let placeToBeVote = {
        userInfo: {
            userId: 1,
        },
        eventInfo: {
            eventId: 2,
        },
        place: {
            placeId: 4
        }
    }

    let placeToBeDevote = {
        userInfo: {
            userId: 1,
        },
        eventInfo: {
            eventId: 2,
        },
        place: {
            placeId: 4
        }
    }

    let userEventInfo = {
        userInfo: {
            userId: 1,
        },
        eventInfo: {
            eventId: 1,
        }
    }

    let output = {
        haha: 'haha'
    };


    beforeEach(()=>{
        io = jasmine.createSpy();
        votePlaceService = jasmine.createSpyObj("votePlaceService",{
            createPlace: Promise.resolve(output),
            votePlaceIncrease: Promise.resolve(output),
            votePlaceDecrease: Promise.resolve(output),
            listAllPlacesByEvent: Promise.resolve(output),

        })
        votePlaceRouter = new VotePlaceRouter(io,votePlaceService);
        socket = jasmine.createSpyObj("socket",["emit","on"]);
        socket.session = {
            passport:{
                id: "Dickson"
            }
        }
    });

    it("should support connection event",()=>{
        votePlaceRouter.connection(socket);
        expect(socket.emit).toHaveBeenCalledWith("id","Dickson");
    });

    it("should support createPlace event",()=>{
        votePlaceRouter.createPlace(socket)().then(()=>{
            expect(socket.to("event" + placeToBeAdded.eventInfo.eventId).emit).toHaveBeenCalledWith("createPlace",placeToBeAdded);
        });
    });

    it("should support votePlaceIncrease event",()=>{
        votePlaceRouter.votePlaceIncrease(socket)().then(()=>{
            expect(socket.to("event" + placeToBeVote.eventInfo.eventId).emit).toHaveBeenCalledWith("votePlaceIncrease",placeToBeVote);
        });
    });

    it("should support votePlaceDecrease event",()=>{
        votePlaceRouter.votePlaceDecrease(socket)().then(()=>{
            expect(socket.to("event" + placeToBeDevote.eventInfo.eventId).emit).toHaveBeenCalledWith("votePlaceDecrease",placeToBeDevote);
        });
    });

    it("should support listAllPlacesByEvent event",()=>{
        votePlaceRouter.listAllPlacesByEvent(socket)().then(()=>{
            expect(socket.to("event" + userEventInfo.eventInfo.eventId).emit).toHaveBeenCalledWith("listAllPlacesByEvent",placeToBeDevote);
        });
    });
});