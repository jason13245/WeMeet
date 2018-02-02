const SocketIORouter = require('../../routers/SocketIORouter');

describe('SocketIORouter ', () => {
    let socketIORouter;
    let socket;
    let io;
    let data = {
        keyword: "text",
        latitude: 100,
        longitude: 100
    }


    beforeEach(() => {
        io = jasmine.createSpy();

        socket = jasmine.createSpyObj("socket", ["emit", 'on']);
        search = jasmine.createSpyObj("search", {
            yelpAutocomplete: Promise.resolve(data),
            googleMapAutocomplete:Promise.resolve(data),
            yelpIDSearch:Promise.resolve(data)
        })
        socketIORouter = new SocketIORouter(io, search);
        socket.session = {
            passport: {
                user: "Gordon"
            }
        }

    });

    it("should support connection event", () => {
        socketIORouter.connection(socket);
        expect(socket.emit).toHaveBeenCalledWith("username", "Gordon");
    });

    it("should support search by name event", () => {
        socketIORouter.searchByName(socket)(data).then(()=>{
            expect(socket.emit).toHaveBeenCalledWith("nameAutocompleteResult", data)
        });
    })

    it("should support search by id",()=>{
        socketIORouter.searchByID(socket)(data).then(()=>{
            expect(socket.emit).toHaveBeenCalledWith("IDSearchResult",data)
        })
    })

    it("should support search by location",()=>{
        socketIORouter.searchByLocation(socket)(data).then(()=>{
            expect(socket.emit).toHaveBeenCalledWith("locationSearchResult",data)
        })
    })


});