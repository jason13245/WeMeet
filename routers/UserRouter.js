const express = require("express");

module.exports = class UserRouter{

    constructor(userService){
        this.userService = userService;
    }

    router(){
        let router = express.Router();
        router.post("/facebook/login",this.facebookLogin.bind(this));
        return router;
    }

    facebookLogin(req,res) {
        this.userService.facebookLogin(req.body.access_token).then((token)=>{
            res.json(token);
        }).catch((err)=>{
            console.log(err);
            res.json(err.response.data);
        });
    }

}