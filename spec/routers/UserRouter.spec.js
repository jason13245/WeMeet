const UserRouter = require('../../routers/UserRouter');

describe("UserRouter",() => {
    let userRouter;
    let userService;
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
        userService = jasmine.createSpyObj("userService",{
            facebookLogin : Promise.resolve(users),
            isAuthenticated: Promise.resolve(users),
            getUserInfo: Promise.resolve(users)
        });
        userRouter = new UserRouter(userService);
        req = jasmine.createSpyObj('req',['params','query','body']);
        res = jasmine.createSpyObj('res',['json']); 
    });

    it("should run router method successfully",()=>{
        userRouter.router();
    });

    it("support facebookLogin method",(done)=>{
        userRouter.facebookLogin(req, res).then(()=>{
            expect(res.json).toHaveBeenCalledWith(users);
            done();
        })
    });

    it("support isAuth method",(done)=>{
        userRouter.isAuth(req, res).then(()=>{
            expect(res.json).toHaveBeenCalledWith(users);
            done();
        })
    });

    it("support getUserInfo method",(done)=>{
        userRouter.getUserInfo(req, res).then(()=>{
            expect(res.json).toHaveBeenCalledWith(users);
            done();
        })
    });

});