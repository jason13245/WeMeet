const FacebookLogin = require('../utils/init-passport');
const UserModel = require('../models').users;
const jwt = require('jwt-simple');
const secret = require('../secret');

module.exports = class UserService{
    facebookLogin(token) {
        return FacebookLogin(token).then((data) => {
            this.createUser(data.data);
        });
    }

    createUser(data) {
        if(!data.error){
            return UserModel.findOne(
                {
                    where: {
                        facebookId: data.id,
                        userName : data.name
                    }
                }
            ).then((user) => {
                let userObj = new UserModel();
                userObj.facebookId= data.id;
                userObj.username= data.name;

                return userObj.save().then((user) => {
                    return { token : jwt.encode(user, secret.jwtSecret)};
                });    
            }).catch(err => {err});

        }
    }

    listAllUsers(){
        return UserModel.findAll().then((result) => {
            return result;
        })
    }
}