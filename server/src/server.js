// @flow

import express from 'express';
import path from 'path';
import reload from 'reload';
import fs from 'fs';
import {Students} from './models.js';
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

    caseDao.getHeadersAndPicturesFromImportantCases((status: Object, data: Object) => {
        console.log('OK');
        res.status(status);
        res.json({ data: data });
    });

});

app.get('/students', (req: Request, res: Response) => {
    return Students.findAll().then(students => res.send(students));
});


// Get Categories
app.get('/cat/:cat', (req: Request, res: Response) => {
    if (!(req.body instanceof Object)) return res.sendStatus(400);

    caseDao.getAllFromOneKat(req.params.cat, (status: Object, data: Object) => {
        res.status(status);
        res.json({ data: data, title: req.params.cat });
    });
});

// Get Case
app.get('/case/:id', (req: Request, res: Response) => {
    if (!(req.body instanceof Object)) return res.sendStatus(400);

    caseDao.getOneCase(req.params.id, (status: Object, data: Object) => {
        res.status(status);
        res.json({ data: data, id: req.params.case });
    });
});


// ---Post---

// Post Reg
app.post('/reg', urlencodedParser, (req: Request, res: Response) => {

    if (!(req.body instanceof Object)) return res.sendStatus(400);

    let currentdate = new Date();
    let datetime = 'Last Sync: ' + currentdate.getDate() + '/'
        + (currentdate.getMonth() + 1) + '/'
        + currentdate.getFullYear() + ' @ '
        + currentdate.getHours() + ':'
        + currentdate.getMinutes();

    res.render({ data: req.body });
    console.log('Fikk POST-request fra klienten.');
    let json = {
        'overskriftInput': req.body.overskriftInput,
        'innholdInput': req.body.innholdInput,
        'tidspunktInput': currentdate,
        'bildeInput': req.body.bildeInput,
        'kategoriInput': req.body.kategoriInput,
        'viktighetInput': req.body.viktighetInput
    };
    caseDao.regNewCase((json: Object), (status, data: Object) => {
        res.status(status);
        res.render('regOk', { data: req.body });
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
