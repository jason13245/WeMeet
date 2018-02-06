const VoteDateRouter = require('../../routers/VoteDateRouter');

describe('VoteDateRouter ',()=>{
    let voteDateRouter;
    let voteDateService;
    let socket;
    let io;


    let users = [
        {
            first_name: "John",
            last_name : "Doe",
            email : "john.doe@gmail.com"
        }
    ]
    let userEventInfo = {
        userInfo: {
            userId: 1,
        },
        eventInfo: {
            eventId: 1,
        }
    }

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

    const output = {
        haha: 'haha'
    }

    beforeEach(()=>{
        io = jasmine.createSpy();
        voteDateService = jasmine.createSpyObj("voteDateService",{
            dateVoteIncrease:Promise.resolve(output),
            dateVoteDecrease:Promise.resolve(output),
            listAllDatesByEvent:Promise.resolve(output),
            createDate:Promise.resolve(output)
        })
        voteDateRouter = new VoteDateRouter(io,voteDateService);
        socket = jasmine.createSpyObj("socket",["emit","on"]);
        socket.session = {
            passport:{
                user: "Dickson"
            }
        }
    });

    xit("should support connection event",()=>{
        voteDateRouter.connection(socket);
        expect(socket.emit).toHaveBeenCalledWith("username","Dickson");
    });

    it("should support createDate event",()=>{
        voteDateRouter.createDate(socket)().then(()=>{
            expect(socket.to("event" + dateToBeAdded.eventInfo.eventId).emit).toHaveBeenCalledWith("dateTableUpdated",dateToBeAdded);
        });
    });

    it("should support dateVoteIncrease event",()=>{
        voteDateRouter.dateVoteIncrease(socket)().then(()=>{
            expect(socket.to("event" + dateToBeVote.eventInfo.eventId).emit).toHaveBeenCalledWith("dateTableUpdated",dateToBeVote);
        });
    });

    it("should support dateVoteDecrease event",()=>{
        voteDateRouter.dateVoteDecrease(socket)().then(()=>{
            expect(socket.to("event" + dateToBeDevote.eventInfo.eventId).emit).toHaveBeenCalledWith("dateTableUpdated",dateToBeDevote);
        });
    });

    it("should support listAllDatesByEvent event",()=>{
        voteDateRouter.listAllDatesByEvent(socket)().then(()=>{
            expect(socket.to("event" + userEventInfo.eventInfo.eventId).emit).toHaveBeenCalledWith("dateTableUpdated",dateToBeDevote);
        });
    });
});