import express from "express";
import bodyparser from 'body-parser';
import helmet from "helmet";
import routes from './routes';

const cors = require('cors');

const app = express();
app.use(helmet()); // set well-known security-related HTTP headers
app.use(cors()) // enable all CORS requests
app.use(bodyparser.json()); // parse application/json
app.use(bodyparser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
app.use('/', routes);

export default app;
