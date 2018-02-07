const express = require('express');

// Import middlewares
const isLoggedIn = require('./utils/guard').isLoggedIn;

// Import models for sequelize
const UserModel = require('./models').users;
const TypeModel = require('./models').types;
const UserEventModel = require('./models').userEvents;
const VoteDateModel = require('./models').voteDates;
const VotePlaceModel = require('./models').votePlaces;

// Import the dependences/models for database to inject to services
const redisClient = require('./redis-database-config');

// Import routers and services
const { ExampleRouter, UserRouter, SocketIORouter,SearchPlaceRouter,EventRouter } = require('./routers');
const { ExampleService, UserService, VoteDateService,SearchService,VotePlaceService,ChatroomService,EventService } = require('./services');

//Create services
let exampleService = new ExampleService();
let userService = new UserService();
let voteDateService = new VoteDateService();
let searchService =new SearchService();
let chatroomService =new ChatroomService();
let votePlaceService = new VotePlaceService();
let eventService = new EventService();

const { app, server, io } = require('./utils/init-app')(redisClient);

const port = process.env.PORT || 5050;

//Import all of the Endpoints in routers
new SocketIORouter(io, searchService, voteDateService, votePlaceService,chatroomService).router();
app.use('/api/v1/example', new ExampleRouter(exampleService).router());
app.use('/api/v1/user', new UserRouter(userService).router());
app.use('/api/v1/voteDate', new UserRouter(io, voteDateService).router());
// app.use('/api/v1/chatroom', new ChatroomRouter(io, chatroomService).router());
app.use('/api/v1/event', new EventRouter(eventService).router());


server.listen(port, () => {
    console.log('Listen on port ' + port);
});

module.exports = app;