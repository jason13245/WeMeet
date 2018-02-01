const express = require("express");
const authClass = require("../utils/strategies/facebook-strategy");

const auth = authClass();

module.exports = class EventRouter{

    constructor(eventService){
        this.eventService = eventService;
    }

    router(){
        let router = express.Router();
        router.get("/list", auth.authenticate(), this.listAllEventsByUser.bind(this));
        router.post("/create", auth.authenticate(), this.createEvent.bind(this));
        return router;
    }

    listAllEventsByUser(req,res) {
        return this.eventService.listAllEventsByUser(req.user.id).then((result) => {
            res.json(result);
        }).catch((err)=>{
            console.log(err);
            res.json(err);
        });
    }

    createEvent(req,res) {
        return this.eventService.createEvent(req.user.profile.id).then((result) => {
            res.json(result);
        }).catch((err)=>{
            console.log(err);
            res.json(err);
        });
    }


}