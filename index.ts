import * as express from 'express';
import * as bodyParser from 'body-parser';
import { router } from './router';

const port = process.env.PORT || 8080;

const app = express();

app.use(bodyParser.json());

//Import all of the Endpoints in routers
app.use('/api/v1', router);

app.listen(port, () => {
    console.log('Listen on port ' + port);
});

export { app } ;