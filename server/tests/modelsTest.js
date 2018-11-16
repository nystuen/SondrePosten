// @flow

import { Students, sync } from '../src/models.js';
import CaseDao from '../src/dao/casedao';
import CommentDao from '../src/dao/commentdao';
import mysql from 'mysql';
import runsqlfile from '../src/dao/testing/runsqlfile';

// GitLab CI Pool
let pool = mysql.createPool({
  connectionLimit: 1,
  host: 'mysql',
  user: 'root',
  password: 'abc123',
  database: 'testdb',
  debug: false,
  multipleStatements: true
});


const caseDao = new CaseDao(pool);
const commentDao = new CommentDao(pool);

beforeAll(done => {
  runsqlfile('create_tables.sql', pool, () => {
    runsqlfile('create_testdata.sql', pool, done);
  });
});

afterAll(() => {
  pool.end();
});


test('Testing if you get all 5 categories', done => {
  function callback(status, data) {
    console.log(
      'Test callback: status=' + status + ', data=' + JSON.stringify(data)
    );
    expect(data.length).toBe(5);
    expect(data[0].kategori).toBe('økonomi');

    done();
  }
  caseDao.getCategories(callback);
});

test('Testing if only get important cases', done => {
  function callback(status, data) {
    console.log(
      'Test callback: status=' + status + ', data=' + JSON.stringify(data)
    );

    data.data.map(s => {
      expect(s.viktighet).toBe(1);
    });
    done();
  }

  caseDao.getHeadersAndPicturesFromImportantCases(callback);
});

test('Testing if first komment is created by user "ole"', done => {
  function callback(status, data) {
    console.log(
      'Test callback: status=' + status + ', data=' + JSON.stringify(data)
    );

    expect(data.data[0].brukernavn).toBe('ole');
    done();
  }

  commentDao.getComments('1', callback);
});

test('Testing if adding one comment works', done => {
  function callback(status, data) {
    console.log(
      'Test callback: status=' + status + ', data=' + JSON.stringify(data)
    );

    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
  }

  commentDao.addComment({brukernavn: "ole", kommentar: "kommentar", sak_id: "1"}, callback);
});
