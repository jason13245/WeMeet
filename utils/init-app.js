const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authClass = require('../utils/strategies/facebook-strategy');

module.exports = ()=>{
    let app = express();
    let server = require('http').Server(app);
    let io = require('socket.io')(server);
    app.use(express.static("public"));
    app.use(bodyParser.json());

    app.use(cors({
        origin: 'http://localhost:8100',
        credentials: true
    }));

    const auth = authClass();
    app.use(auth.initialize());

    return{
        app : app,
        server: server,
        io: io
    }
}