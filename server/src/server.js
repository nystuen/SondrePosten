// @flow

import express from 'express';
import path from 'path';
import reload from 'reload';
import fs from 'fs';
import CaseDao from './dao/casedao';
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
app.use(express.static(public_path));
app.use(express.json()); // For parsing application/json


// ---Get---

// Get Homepage
app.get('/importantCases', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);

  caseDao.getHeadersAndPicturesFromImportantCases((status: number, data: Object) => {
    console.log('OK');
    res.status(status);
    res.json({ data: data });
  });
});


// Get livefeed
app.get('/livefeed', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);


  caseDao.getNewestCasesForLiveFeed((status: number, data: Object) => {
    console.log('OK');
    res.status(status);
    res.json({ data: data });
  });
});


// Get Categories
app.get('/kat/:kat', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);

  caseDao.getAllFromOneKat(req.params.kat, (status: number, data: Object) => {
    console.log('størrelse: ', data.length);
    res.status(status);
    res.json({ data: data, title: req.params.kat, lengde: data.length });
  });
});

// Get Case
app.get('/case/:id', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);

  caseDao.getOneCase(req.params.id, (status: number, data: Object) => {
    res.status(status);
    res.json({ data: data });
  });
});

// Get comments
app.get('/comments/:id', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);

  caseDao.getComments(req.params.id, (status: number, data: Object) => {
    res.status(status);
    res.json({ data: data });
  });
});

// ---Post---

// Add new case
app.post('/reg', (req: Request, res: Response) => {

  if (!(req.body instanceof Object)) return res.sendStatus(400);

  let currentdate = new Date();
  let datetime = currentdate.getDate() + '/'
    + (currentdate.getMonth() + 1) + '/'
    + currentdate.getFullYear() + ' Kl. '
    + currentdate.getHours() + ':'
    + currentdate.getMinutes();

  console.log('Fikk POST-request fra klienten: addCase');
// $FlowFixMe

  let json = {
    // $FlowFixMe
    'overskriftInput': req.body.overskriftInput,
    // $FlowFixMe
    'innholdInput': req.body.innholdInput,
    // $FlowFixMe
    'bildetekstInput': req.body.bildetekstInput,

    'tidspunktInput': datetime,
    // $FlowFixMe
    'bildeInput': req.body.bildeInput,
    // $FlowFixMe
    'kategoriInput': req.body.kategoriInput,
    // $FlowFixMe
    'viktighetInput': req.body.viktighetInput
  };

  caseDao.regNewCase((json: Object), (status: number, data: Object) => {
    console.log('nice!!');
    res.status(status);
  });
});


// Put

// Delete (set aktiv=0)
app.put('/deleteCase/:id', (req: Request, res: Response) => {
  if (!(req.body instanceof Object)) return res.sendStatus(400);

  caseDao.setCaseAsInactive(req.params.id, (status: number, data: Object) => {
    console.log('sak ' + req.params.id + ' slettet.');
    res.status(status);
  });
});


// Add new comment to case

app.post('/addComment/:id', (req: Request, res: Response) => {

  if (!(req.body instanceof Object)) return res.sendStatus(400);
  console.log('Fikk POST-request fra klienten: addComment');

  let json = {
    // $FlowFixMe
    'sak_id': req.body.sak_id,
    // $FlowFixMe
    'brukernavn': req.body.brukernavn,
    // $FlowFixMe
    'kommentar': req.body.kommentar
  };

  caseDao.addComment((json: Object), (status: number, data: Object) => {
    console.log('added comment.');
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
