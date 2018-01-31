const express = require("express");

module.exports = class EventRouter{

    constructor(eventService){
        this.eventService = eventService;
    }

    router(){
        let router = express.Router();
        router.get("/list",this.listAllEventsByUser.bind(this));
        router.post("/create",this.createEvent.bind(this));
        return router;
    }

    listAllEventsByUser(req,res) {
        console.log(req.user);
        return this.eventService.listAllEventsByUser(req.user.profile.id).then((result) => {
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