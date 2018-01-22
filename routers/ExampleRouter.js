const express = require("express");

module.exports = class ExampleRouter{

    constructor(exampleService){
        this.exampleService = exampleService;
    }

    router(){
        let router = express.Router();
        router.get("/greeting",this.greeting.bind(this));
        return router;
    }

    greeting(req,res) {
        let result = this.exampleService.greeting();
        res.json(result);
    }

}