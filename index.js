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
const knexClient = require('./knex-database-config');

// Import routers and services
const { ExampleRouter, UserRouter, VoteDateRouter ,VotePlaceRouter, EventRouter, SocketIORouter } = require('./routers');
const { ExampleService, UserService, VoteDateService,VotePlaceService, EventService, SearchService} = require('./services');

//Create services
let exampleService = new ExampleService();
let userService = new UserService();
let voteDateService = new VoteDateService();
let votePlaceService = new VotePlaceService();
let eventService = new EventService();
let searchService = new SearchService();

const { app,server,io } = require('./utils/init-app')(redisClient);

const port = process.env.PORT || 8080;

//Import all of the Endpoints in routers
new VoteDateRouter(io,voteDateService).router();
new VotePlaceRouter(io,votePlaceService).router();
new SocketIORouter(io,searchService).router();
app.use('/api/v1/example', new ExampleRouter(exampleService).router());
app.use('/api/v1/user', new UserRouter(userService).router());
app.use('/api/v1/event', new EventRouter(eventService).router());


server.listen(port, () => {
    console.log('Listen on port ' + port);
});

module.exports = app;