// @flow

import express from 'express';
import path from 'path';
import reload from 'reload';
import fs from 'fs';
import CaseDao from './dao/casedao';
import CommentDao from './dao/commentdao';
import RatingDao from './dao/ratingdao';
import mysql from 'mysql';
import commentController from './controllers/commentController';
import ratingController from './controllers/ratingController';
import caseController from './controllers/caseController';

const bodyParser = require('body-parser');
const config = require('getconfig');

type Request = express$Request;
type Response = express$Response;

const public_path = path.join(
  __dirname,
  '/../../client/public'
);

const pool = mysql.createPool({
  connectionLimit: 5,
  host: 'mysql.stud.iie.ntnu.no',
  user: 'aadneny',
  password: config.db_password,
  database: 'aadneny',
  debug: false
});

let app = express();
export let urlencodedParser = bodyParser.urlencoded({
  extended: false
});
let caseDao = new CaseDao(pool);
let commentDao = new CommentDao(pool);
let ratingDao = new RatingDao(pool);
app.use(express.static(public_path));
app.use(express.json()); // For parsing application/json

// Fire controllers
commentController(app, commentDao);
ratingController(app, ratingDao);
caseController(app, caseDao);

// Hot reload application when not in production environment
if (process.env.NODE_ENV !== 'production') {
  let reloadServer = reload(app);
  fs.watch(public_path, () => reloadServer.reload());
}

// The listen promise can be used to wait for the web server to start (for instance in your tests)
export let listen = new Promise<void>((resolve, reject) => {
  app.listen(3000,    error=> {
    if (error) reject(error.message);
    console.log('Server started');
    resolve();
  });
});
