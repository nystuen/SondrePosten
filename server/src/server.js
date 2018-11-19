// @flow

import express from 'express';
import path from 'path';
import reload from 'reload';
import fs from 'fs';
import CaseDao from './dao/casedao';
import CommentDao from './dao/commentDao';
import RatingDao from './dao/ratingDao';
import mysql from 'mysql';

const bodyParser = require('body-parser');

type Request = express$Request;
type Response = express$Response;

const public_path = path.join(__dirname, '/../../client/public');

const pool = mysql.createPool({
  connectionLimit: 5,
  host: 'mysql.stud.iie.ntnu.no',
  user: 'aadneny',
  password: '4jzYVq7M',
  database: 'aadneny',
  debug: false
});

let app = express();
let urlencodedParser = bodyParser.urlencoded({ extended: false });
let caseDao = new CaseDao(pool);
let commentDao = new CommentDao(pool);
let ratingDao = new RatingDao(pool);
app.use(express.static(public_path));
app.use(express.json()); // For parsing application/json


// ---Get---

// Get Homepage
app.get('/api/importantCases', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);

  caseDao.getHeadersAndPicturesFromImportantCases((status: number, data: Object) => {
    res.status(status);
    res.json({ data: data });
  });
});


// Get livefeed
app.get('/api/livefeed', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);

  caseDao.getNewestCasesForLiveFeed((status: number, data: Object) => {
    res.status(status);
    res.json({ data: data });
  });
});


// Get Categories
app.get('/api/getCategories', (req: Request, res: Response) => {

  caseDao.getCategories((status: number, data: Object) => {
    res.status(status);
    res.json({ data: data });
  });
});

// Get all cases from one kat
app.get('/api/cat/:cat', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);

  caseDao.getAllFromOneKat(req.params.cat, (status: number, data: Object) => {
    console.log('størrelse: ', data.length);
    res.status(status);
    res.json({ data: data, title: req.params.cat, lengde: data.length });
  });
});

// Get Case
app.get('/api/case/:id', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);

  caseDao.getOneCase(req.params.id, (status: number, data: Object) => {
    res.status(status);
    res.json({ data: data });
  });
});

// Get comments
app.get('/api/comments/:id', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);

  commentDao.getComments(parseInt(req.params.id), (status: number, data: Object) => {
    res.status(status);
    res.json({ data: data });
  });
});

// Get likes

app.get('/api/likes/:id', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);

  ratingDao.getLikesFromCase(req.params.id, (status: number, data: Object) => {
    res.status(status);
    console.log('likesServer: ', data[0].likes);
    res.json({ data: data });
  });
});

// Get dislikes
app.get('/api/dislikes/:id', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);

  ratingDao.getDislikesFromCase(req.params.id, (status: number, data: Object) => {
    res.status(status);
    console.log('dislikesServer: ', data[0].dislikes);
    res.json({ data: data });
  });
});


// ---Post---

// Add new case
app.post('/api/reg', (req: Request, res: Response) => {

  if (!(req.body instanceof Object)) return res.sendStatus(400);
  let currentdate = new Date();

  let datetime = currentdate.getFullYear() + '-'
    + (currentdate.getMonth() + 1) + '-'
    + currentdate.getDate() + ' Kl. '
    + currentdate.getHours() + ':'
    + currentdate.getMinutes();

  let json = {
    // $FlowFixMe
    'overskrift': req.body.overskrift,
    // $FlowFixMe
    'innhold': req.body.innhold,
    // $FlowFixMe
    'bildetekst': req.body.bildetekst,

    'tidspunkt': datetime,
    // $FlowFixMe
    'bilde': req.body.bilde,
    // $FlowFixMe
    'kategori': req.body.kategori,
    // $FlowFixMe
    'viktighet': req.body.viktighet
  };

  caseDao.regNewCase((json: Object), (status: number, data: Object) => {
    console.log('nice!!');
    res.status(status);
  });
});


// Add new comment to case
app.post('/api/addComment/:id', (req: Request, res: Response) => {

  if (!(req.body instanceof Object)) return res.sendStatus(400);

  let json = {
    // $FlowFixMe
    'sak_id': req.body.sak_id,
    // $FlowFixMe
    'brukernavn': req.body.brukernavn,
    // $FlowFixMe
    'kommentar': req.body.kommentar
  };

  commentDao.addComment((json: Object), (status: number, data: Object) => {
    console.log('added comment.');
    res.status(status);
  });
});


// Like case
app.post('/api/likeCase/:id', (req: Request, res: Response) => {

  if (!(req.body instanceof Object)) return res.sendStatus(400);

  ratingDao.likeCase((req.params.id), (status: number, data: Object) => {
    res.status(status);
  });
});

// Dislike case
app.post('/api/dislikeCase/:id', (req: Request, res: Response) => {

  if (!(req.body instanceof Object)) return res.sendStatus(400);

  ratingDao.dislikeCase((req.params.id), (status: number, data: Object) => {
    res.status(status);
  });
});


// ---Put---

// Update case

app.put('/api/editCase/:id', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);

  let json = {
    // $FlowFixMe
    'overskrift': req.body.overskrift,
    // $FlowFixMe
    'innhold': req.body.innhold,
    // $FlowFixMe
    'bildetekst': req.body.bildetekst,
    // $FlowFixMe
    'bilde': req.body.bilde,
    // $FlowFixMe
    'kategori': req.body.kategori,
    // $FlowFixMe
    'viktighet': req.body.viktighet,
    // $FlowFixMe
    'id': req.paramd.id
  };

  caseDao.editCase((json: Object), (status: number, data: Object) => {
    console.log('sak ' + req.params.id + ' er endret.');
    res.status(status);
  });
});


// Delete (set aktiv=0)
app.put('/api/deleteCase/:id', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);

  caseDao.setCaseAsInactive(req.params.id, (status: number, data: Object) => {
    console.log('sak ' + req.params.id + ' slettet.');
    res.status(status);
  });
});


// Hot reload application when not in production environment
if (process.env.NODE_ENV !== 'production') {
  let reloadServer = reload(app);
  fs.watch(public_path, () => reloadServer.reload());
}

// The listen promise can be used to wait for the web server to start (for instance in your tests)
export let listen = new Promise<void>((resolve, reject) => {
  app.listen(3000, error => {
    if (error) reject(error.message);
    console.log('Server started');
    resolve();
  });
});
