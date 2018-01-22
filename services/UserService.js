const FacebookLogin = require('../utils/strategies/facebook-strategy');

module.exports = class UserService{
    constructor(UserModel){
        this.UserModel = UserModel;
    }

    facebookLogin(token) {
        return FacebookLogin(token).then((data) => {
            createUser(data.data);
        });
    }

    createUser(data) {
        if(!data.error){
            let userObj = new this.UserModel();
            userObj.facebookId= data.id;
            userObj.userName= data.name;

            return userObj.save().then((user) => {
                return { token : jwt.encode(user, secret.jwtSecret)};
            });
        }
    }
}