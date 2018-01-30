const FacebookLogin = require('../utils/init-passport');
const UserModel = require('../models').users;
const jwt = require('jwt-simple');
const secret = require('../secret');

module.exports = class UserService{
    facebookLogin(token) {
        return FacebookLogin(token).then((data) => {
            return this.createUser(data.data);
        });
    }

    isAuthenticated(token) {
        console.log(token);
        if(token !== undefined || token !== null){
            let payload = jwt.decode(token.token, secret.jwtSecret, true);
            return UserModel.findOne({
                where: {
                    facebookId: payload.facebookId,
                    username: payload.username,
                }
            }).then((user) =>{
                return user !== undefined;
            }).catch(err => {
                return false;
            });
        }else{
            return false;
        }
    }

    getUserInfo(token) {
        if(token !== undefined || token !== null){
            let payload = jwt.decode(token.token, secret.jwtSecret, true);
            return UserModel.findOne({
                where: {
                    facebookId: payload.facebookId,
                    username: payload.username,
                }
            }).then((user) =>{
                return user;
            }).catch(err => {
                throw "Unauthorized!"
            });
        }else{
            throw "Unauthorized!"
        }
    }

    createUser(data) {
        if(!data.error){
            return UserModel.findOne(
                {
                    where: {
                        facebookId: data.id,
                        username : data.name
                    }
                }
            ).then((user) => {
                if(user){
                    console.log(jwt.encode(user, secret.jwtSecret));
                    return { token : jwt.encode(user, secret.jwtSecret)};
                }else{
                    let userObj = new UserModel();
                    userObj.facebookId= data.id;
                    userObj.username= data.name;
    
                    return userObj.save().then((user) => {
                        return { token : jwt.encode(user, secret.jwtSecret)};
                    }); 
                }
            }).catch(err => {err});
        }
    }

    listAllUsers(){
        return UserModel.findAll().then((result) => {
            return result;
        })
    }
}