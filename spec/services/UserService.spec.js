const { UserService } = require('../../services');
const UserModel = require('../../models').users;

describe("UserService",() => {
    let example = {
        id: '111111111',
        name: 'Test User'
    }
    beforeEach((done)=>{
        userService = new UserService();
        UserModel.destroy({
            where: {}
        }).then(() => {
            done();
        });
    });

    xit("should create a user record to database",(done)=>{
        userService.createUser(example)
        .then(() => UserModel.findAll())
            .then((data)=>{
                expect(data.length).toEqual(1);
                expect(data[0].facebookId).toEqual('111111111');
                expect(data[0].username).toEqual("Test User");
                done();
            });
    });
});