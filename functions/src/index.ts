import * as functions from 'firebase-functions'
import * as express from 'express'
import {getFibonacci} from "./fibonacci";
import {getAllRequests} from "./oldRequests";

const app = express();

app.get('/', (req, res) => res.status(200).send('Hey there!'));
// @ts-ignore
app.get('/requests', getAllRequests);
app.get('/fibonacci/:num', getFibonacci);


exports.app = functions.https.onRequest(app)