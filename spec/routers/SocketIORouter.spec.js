const SocketIORouter = require('../../routers/SocketIORouter');

describe('SocketIORouter ', () => {
    let socketIORouter;
    let searchService;
    let chatroomService;
    let voteDateService;
    let votePlaceService;
    let io;
    let socket;

    //Fake data for searching place
    let data = {
        eventId: 1,
        keyword: "text",
        latitude: 100,
        longitude: 100
    }

    //Fake input data for voting place
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

    //Fake input for chatroom
    let messageToBeSent = {
        f
    }

    //Fake input data for voting date
    let dateToBeAdded = {
        userInfo: {
            userId: 2,
        },
        eventInfo: {
            eventId: 1,
        },
        date: new Date(2017,2,26).getTime()
    }

    let dateToBeVote = {
        userInfo: {
            userId: 1,
        },
        eventInfo: {
            eventId: 2,
        },
        date: {
            dateId: 4
        }
    }

    let dateToBeDevote = {
        userInfo: {
            userId: 1,
        },
        eventInfo: {
            eventId: 2,
        },
        date: {
            dateId: 4
        }
    }

    //Fake user information
    let userEventInfo = {
        userInfo: {
            userId: 1,
        },
        eventInfo: {
            eventId: 1,
        }
    }

    const output = {
        haha: 'haha'
    }


    beforeEach(() => {
        io = jasmine.createSpy();

        searchService = jasmine.createSpyObj("searchService", {
            yelpAutocomplete: Promise.resolve(data),
            googleMapAutocomplete:Promise.resolve(data),
            yelpIDSearch:Promise.resolve(data)
        });
        votePlaceService = jasmine.createSpyObj("votePlaceService",{
            createPlace: Promise.resolve(output),
            votePlaceIncrease: Promise.resolve(output),
            votePlaceDecrease: Promise.resolve(output),
            listAllPlacesByEvent: Promise.resolve(output),
        });
        voteDateService = jasmine.createSpyObj("voteDateService",{
            dateVoteIncrease:Promise.resolve(output),
            dateVoteDecrease:Promise.resolve(output),
            listAllDatesByEvent:Promise.resolve(output),
            createDate:Promise.resolve(output)
        });
        chatroomService = jasmine.createSpyObj("chatroomService",{
            storeMsg:Promise.resolve(output),
            getMsg:Promise.resolve(output)
        });

        socketIORouter = new SocketIORouter(io,searchService, voteDateService, votePlaceService,chatroomService);
        socket = jasmine.createSpyObj("socket",["emit","on"]);

        socket.session = {
            passport: {
                user: "Gordon"
            }
        }

    });

    xit("should support connection event", () => {
        socketIORouter.connection(socket);
        expect(socket.emit).toHaveBeenCalledWith("username", "Gordon");
    });

    it("should support search by name event", () => {
        socketIORouter.searchPlaceByName(socket)(data).then(()=>{
            expect(socket.to("event" + data.eventId).emit).toHaveBeenCalledWith("nameAutocompleteResult", data)
        });
    })
    
    it("should support search by id",()=>{
        socketIORouter.searchPlaceById(socket)(data).then(()=>{
            expect(socket.to("event" + data.eventId).emit).toHaveBeenCalledWith("IDSearchResult",data)
        })
    })

    xit("should support search by location",()=>{
        socketIORouter.searchByLocation(socket)(data).then(()=>{
            expect(socket.to("event" + data.eventId).emit).toHaveBeenCalledWith("locationSearchResult",data)
        })
    })

    it("should support createDate event",()=>{
        socketIORouter.createDate(socket)().then(()=>{
            expect(socket.to("event" + dateToBeAdded.eventInfo.eventId).emit).toHaveBeenCalledWith("dateTableUpdated",dateToBeAdded);
        });
    });

    it("should support dateVoteIncrease event",()=>{
        socketIORouter.dateVoteIncrease(socket)().then(()=>{
            expect(socket.to("event" + dateToBeVote.eventInfo.eventId).emit).toHaveBeenCalledWith("dateTableUpdated",dateToBeVote);
        });
    });

    it("should support dateVoteDecrease event",()=>{
        socketIORouter.dateVoteDecrease(socket)().then(()=>{
            expect(socket.to("event" + dateToBeDevote.eventInfo.eventId).emit).toHaveBeenCalledWith("dateTableUpdated",dateToBeDevote);
        });
    });

    it("should support listAllDatesByEvent event",()=>{
        socketIORouter.listAllDatesByEvent(socket)().then(()=>{
            expect(socket.to("event" + userEventInfo.eventInfo.eventId).emit).toHaveBeenCalledWith("dateTableUpdated",dateToBeDevote);
        });
    });

    it("should support createPlace event",()=>{
        socketIORouter.createPlace(socket)().then(()=>{
            expect(socket.to("event" + placeToBeAdded.eventInfo.eventId).emit).toHaveBeenCalledWith("createPlace",placeToBeAdded);
        });
    });

    it("should support votePlaceIncrease event",()=>{
        socketIORouter.votePlaceIncrease(socket)().then(()=>{
            expect(socket.to("event" + placeToBeVote.eventInfo.eventId).emit).toHaveBeenCalledWith("votePlaceIncrease",placeToBeVote);
        });
    });

    it("should support votePlaceDecrease event",()=>{
        socketIORouter.votePlaceDecrease(socket)().then(()=>{
            expect(socket.to("event" + placeToBeDevote.eventInfo.eventId).emit).toHaveBeenCalledWith("votePlaceDecrease",placeToBeDevote);
        });
    });

    it("should support listAllPlacesByEvent event",()=>{
        socketIORouter.listAllPlacesByEvent(socket)().then(()=>{
            expect(socket.to("event" + userEventInfo.eventInfo.eventId).emit).toHaveBeenCalledWith("listAllPlacesByEvent",placeToBeDevote);
        });
    });

});