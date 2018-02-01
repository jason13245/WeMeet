const EventRouter = require('../../routers/eventRouter');

describe('EventRouter',() => {
    let eventRouter;
    let eventService;
    let req;
    let res;

    let users = [
        {
            first_name: "John",
            last_name : "Doe",
            email : "john.doe@gmail.com"
        }
    ]

    beforeEach(()=>{
        eventService = jasmine.createSpyObj("eventService",{
            listAllEventsByUser : Promise.resolve(users),
            createEvent: Promise.resolve(users)
        });
        eventRouter = new EventRouter(eventService);
        req = jasmine.createSpyObj('req',['params','query','body','user',['id']]);
        res = jasmine.createSpyObj('res',['json']); 
    });

    it("should run router method successfully",()=>{
        eventRouter.router();
    });

    it("support listAllEventsByUser method",(done)=>{
        eventRouter.listAllEventsByUser(req, res).then(()=>{
            expect(res.json).toHaveBeenCalledWith(users);
            done();
        })
    });

    it("support createEvent method",(done)=>{
        eventRouter.createEvent(req, res).then(()=>{
            expect(res.json).toHaveBeenCalledWith(users);
            done();
        })
    });





})