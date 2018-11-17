// @flow

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


test('Testing if you get all 5 categories, getAllFromOneKat', done => {
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

    data.map(s => {
      expect(s.viktighet).toBe(1);
    });
    done();
  }

  caseDao.getHeadersAndPicturesFromImportantCases(callback);
});


test('Testing if you ge the correct case, getOneCase', done => {
  function callback(status, data) {
    console.log(
      'Test callback: status=' + status + ', data=' + JSON.stringify(data)
    );

    expect(data[0].id).toBe(1);
    done();
  }

  caseDao.getOneCase('1', callback);
});


test('Testing if first komment is created by user "ole"', done => {
  function callback(status, data) {
    console.log(
      'Test callback: status=' + status + ', data=' + JSON.stringify(data)
    );

    expect(data[0].brukernavn).toBe('ole');
    done();
  }

  commentDao.getComments(1, callback);
});


test('Testing if adding one comment works', done => {
  function callback(status, data) {
    console.log(
      'Test callback: status=' + status + ', data=' + JSON.stringify(data)
    );

    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
  }

  commentDao.addComment({ brukernavn: 'ole', kommentar: 'kommentar', sak_id: '1' }, callback);
});

test('Testing if you get 5 important cases for, getNewesCasesForLiveFeed', done => {
  function callback(status, data) {
    console.log(
      'Test callback: status=' + status + ', data=' + JSON.stringify(data)
    );

    expect(data.length).toBe(5);

    data.map(s => {
      expect(s.viktighet).toBe(1);
    });

    done();
  }

  caseDao.getNewestCasesForLiveFeed(callback);
});

test('Testing if adding one case works', done => {
  function callback(status, data) {
    console.log(
      'Test callback: status=' + status + ', data=' + JSON.stringify(data)
    );

    expect(data.affectedRows).toBeGreaterThanOrEqual(1);
    done();
  }

  caseDao.regNewCase(
    {aktiv: 1, overksrift: "overksrift", bildetekst: "bildetekst",
      innhold: "innhold", tidspunkt: "tidspunkt", bilde:"bilde",
      kategori:"sport", viktighet:1}, callback);

});
