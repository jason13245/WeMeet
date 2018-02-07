const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authClass = require('../utils/strategies/facebook-strategy');

module.exports = (redisClient)=>{
    let app = express();
    let server = require('http').Server(app);
    let io = require('socket.io')(server);
    app.use(express.static("public"));
    app.use(bodyParser.json());
    require('dotenv').config();

    app.use(cors());

    const auth = authClass();
    app.use(auth.initialize());

    require('./init-sessions')(app,io,redisClient);
    require('./init-passport')(app);

    return{
        app : app,
        server: server,
        io: io
    }
}