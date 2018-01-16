const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router')(express);

const port = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json());

//Import all of the Endpoints in routers
app.use('/api/v1', router);

app.listen(port, () => {
    console.log('Listen on port ' + port);
});

module.exports = app;