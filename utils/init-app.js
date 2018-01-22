const express = require('express');
const bodyParser = require('body-parser');

module.exports = ()=>{
    let app = express();
    let server = require('http').Server(app);
    let io = require('socket.io')(server);
    app.use(express.static("public"));
    app.use(bodyParser.json());

    return{
        app : app,
        server: server,
        io: io
    }
}