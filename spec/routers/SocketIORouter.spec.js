const SocketIORouter = require('../../routers/SocketIORouter');

describe('SocketIORouter ', () => {
    let socketIORouter;
    let searchService;
    let socketIOService;
    let voteDateService;
    let votePlaceService;
    let io;
    let data = {
        eventId: 1,
        keyword: "text",
        latitude: 100,
        longitude: 100
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
        })
        votePlaceService = jasmine.createSpyObj("votePlaceService",{
            createPlace: Promise.resolve(output),
            votePlaceIncrease: Promise.resolve(output),
            votePlaceDecrease: Promise.resolve(output),
            listAllPlacesByEvent: Promise.resolve(output),
        })
        voteDateService = jasmine.createSpyObj("voteDateService",{
            dateVoteIncrease:Promise.resolve(output),
            dateVoteDecrease:Promise.resolve(output),
            listAllDatesByEvent:Promise.resolve(output),
            createDate:Promise.resolve(output)
        })

        socket = jasmine.createSpyObj("socket","to",["emit","on"]);
        socketIORouter = new SocketIORouter(io, searchService, voteDateService, votePlaceService);
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


});