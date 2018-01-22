const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const server = require('http').Server(app);
const io = require('./socket')(server);

// Import the dependences/models for database to inject to services
const redisClient = require('./redis-database-config');
const knexClient = require('./knex-database-config');

//Import routers and services
const { ExampleRouter, UserRouter } = require('./routers');
const { ExampleService, UserService } = require('./services');

//Create services
let exampleService = new ExampleService();
let userService = new UserService();

const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(cors({
    origin: 'http://localhost:8100',
    credentials: true
}));

//Import all of the Endpoints in routers
app.use('/api/v1/example', new ExampleRouter(exampleService).router());
app.use('/api/v1/user', new UserRouter(userService).router());

server.listen(port, () => {
    console.log('Listen on port ' + port);
});

module.exports = app;