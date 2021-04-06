import * as functions from 'firebase-functions'
import * as express from 'express'
import {getFibonacci} from "./fibonacci";
import {getAllRequests} from "./oldRequests";

const cors = require('cors');
const app = express();

app.use(cors());
app.use(cors({
  origin: 'https://syncvr-fc5d5.web.app/'
}));

app.get('/', (req, res) => res.status(200).send('Hey there!'));
// @ts-ignore
app.get('/requests', getAllRequests);
app.get('/fibonacci/:num', getFibonacci);


exports.app = functions.https.onRequest(app)