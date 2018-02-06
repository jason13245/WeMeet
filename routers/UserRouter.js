const express = require("express");

module.exports = class UserRouter{

    constructor(userService){
        this.userService = userService;
    }

    router(){
        let router = express.Router();
        router.post("/facebook/login",this.facebookLogin.bind(this));
        router.post("/facebook/isAuth",this.isAuth.bind(this));
        router.post("/facebook/userInfo",this.getUserInfo.bind(this));
        return router;
    }

    isAuth(req,res){
        console.log(req.body);
        return this.userService.isAuthenticated(req.body.token).then((isAuth) => {
            res.json(isAuth);
        }).catch((err)=>{
            console.log(err);
            res.json(err);
        });
    }

    getUserInfo(req,res){
        return this.userService.getUserInfo(req.body.token).then((user) => {
            res.json(user);
        }).catch((err)=>{
            console.log(err);
            res.json(err);
        });
    }

    facebookLogin(req,res) {
        return this.userService.facebookLogin(req.body.access_token).then((token)=>{
            res.json(token);
        }).catch((err)=>{
            console.log(err);
            res.json(err.response.data);
        });
    }

}