const { UserService } = require('../../services');
const UserModel = require('../../models').users;

describe("UserService",() => {
    let example = {
        id: '111111111',
        name: 'Test User'
    }

    const userService = new UserService();

    it("should create a user record to database",(done)=>{
        userService.createUser(example)
            .then((token) => {
                console.log(token);
                UserModel.findOne({
                    where: {
                        facebookId: example.id,
                        username: example.name,
                    }
                }).then((data)=>{
                console.log(data)
                expect(data.facebookId).toEqual(example.id);
                expect(data.username).toEqual(example.name);
                done();
            });
        });
    });
});