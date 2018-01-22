const FacebookLogin = require('../utils/strategies/facebook-strategy');
const UserModel = require('../models').users;
const jwt = require('jwt-simple');
const secret = require('../secret');

module.exports = class UserService{
    facebookLogin(token) {
        return FacebookLogin(token).then((data) => {
            createUser(data.data);
        });
    }

    createUser(data) {
        if(!data.error){
            let userObj = new UserModel();
            userObj.facebookId= data.id;
            userObj.userName= data.name;

            return userObj.save().then((user) => {
                return { token : jwt.encode(user, secret.jwtSecret)};
            });
        }
    }

    listAllUsers(){
        return UserModel.findAll().then((result) => {
            return result;
        })
    }
}