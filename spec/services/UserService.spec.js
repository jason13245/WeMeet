const { UserService } = require('../../services');
const UserModel = require('../../models').users;

beforeEach((done)=>{
    userService = new UserService();

    //Set test environment

    UserModel.destroy({
        where: {}
    }).then(() => {
        done();
    });
});

afterEach((done)=>{
    UserModel.destroy({
        where: {
            facebookId: '111111111',

        }
    }).then(() => {
        done();
    });
});

describe("UserService",() => {
    let example = {
        id: '111111111',
        name: 'Test User'
    }


    it("should create a user record to database", (done)=>{
        userService.createUser(example).then((user, created) => {
            UserModel.findAndCountAll().then((data)=>{
                expect(data.count).toEqual(1);
                done();
            });
        });
    });

    it("should not create a user record when user is existed in ",(done)=>{
        userService.createUser(example).then((user, created) => {
            UserModel.findAndCountAll().then((data)=>{
                expect(data.count).toEqual(1);
                done();
            });
        });
    });
});