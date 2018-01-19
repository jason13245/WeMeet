const db = require('../knex-database-config');
const client = require('../redis-database-config');
const axios = require('axios');
const UserModel = require('../models').users;
const secret = require('../secret');
const jwt = require('jwt-simple');

const fbGraphAPI = 'https://graph.facebook.com/me?access_token=';

module.exports = class UserService{
    facebookLogin(token) {
    return axios.get(`${fbGraphAPI}${token}`)
        .then((data)=>{
            console.log('data : ',data.data);
            if(!data.data.error){
                let userObj = new UserModel();
                userObj.facebookId= data.data.id;
                userObj.userName= data.data.name;

                userObj.save().then((user) => {
                    return { token : jwt.encode(user, secret.jwtSecret)};
                });
            }
        });
    }
}