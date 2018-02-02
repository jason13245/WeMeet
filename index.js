const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const axios = require('axios');

// Import middlewares
const isLoggedIn = require('./utils/guard').isLoggedIn;

// Import models for sequelize
const UserModel = require('./models').users;
const TypeModel = require('./models').types;
const UserEventModel = require('./models').userEvents;
const VoteDateModel = require('./models').voteDates;

// Import the dependences/models for database to inject to services
const redisClient = require('./redis-database-config');
const knexClient = require('./knex-database-config');

// Import routers and services
const { ExampleRouter, UserRouter, VoteDateRouter, SocketIORouter,SearchPlaceRouter,VotePlaceRouter, ChatroomRouter } = require('./routers');
const { ExampleService, UserService, VoteDateService,SearchService,VotePlaceService,ChatroomService } = require('./services');

//Create services
let exampleService = new ExampleService();
let userService = new UserService();
let voteDateService = new VoteDateService();
let searchService =new SearchService();
let votePlaceService =new VotePlaceService();
let chatroomService =new ChatroomService();

const { app,server,io } = require('./utils/init-app')(redisClient);

const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:8100',
    credentials: true
}));

//Import all of the Endpoints in routers
new SocketIORouter(io,searchService,voteDateService,votePlaceService).router();
app.use('/api/v1/example', new ExampleRouter(exampleService).router());
app.use('/api/v1/user', new UserRouter(userService).router());
app.use('/api/v1/voteDate', new UserRouter(io, voteDateService).router());
// app.use('/api/v1/chatroom', new ChatroomRouter(io, chatroomService).router());


server.listen(port, () => {
    console.log('Listen on port ' + port);
});

module.exports = app;