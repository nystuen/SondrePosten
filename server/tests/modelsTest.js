// @flow

import CaseDao from '../src/dao/casedao';
import CommentDao from '../src/dao/commentdao';
import RatingDao from '../src/dao/ratingdao';
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
const ratingDao = new RatingDao(pool);

beforeAll(done => {
  runsqlfile('create_tables.sql', pool, () => {
    runsqlfile('create_testdata.sql', pool, done);
  });
});

afterAll(() => {
  pool.end();
});

// --Test for caseDao--

test('Testing if you get all 5 categoriesList, getAllFromOneKat', done => {
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


test('Testing if you get the correct case, getOneCase', done => {
  function callback(status, data) {
    console.log(
      'Test callback: status=' + status + ', data=' + JSON.stringify(data)
    );

    expect(data[0].id).toBe(1);
    done();
  }

  caseDao.getOneCase('1', callback);
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

    // Then check if amount of cases has increased by one
    function callback2(status, data) {

      expect(data.rows).toBe(8);
    }

    caseDao.getAllHeadersAndPictures(callback2);

    done();
  }

  caseDao.regNewCase(
    {
      aktiv: 1, overksrift: 'overksrift', bildetekst: 'bildetekst',
      innhold: 'innhold', tidspunkt: 'tidspunkt', bilde: 'bilde',
      kategori: 'sport', viktighet: 1
    }, callback);

});

test('Testing if deleting one case sets aktiv = 0, setCaseAsInactive', done => {
  function callback1(status, data) {
    console.log(
      'Test callback: status=' + status + ', data=' + JSON.stringify(data)
    );
  }

  caseDao.setCaseAsInactive('1', callback1);

  function callback2(status, data) {
    console.log(
      'Test callback: status=' + status + ', data=' + JSON.stringify(data)
    );
    expect(data[0].aktiv).toBe(0);
  }

  caseDao.getOneCase('1', callback2);

  done();
});


// ---Tests for commentDao---

test('Testing if first comment is created by user "ole"', done => {
  function callback(status, data) {
    console.log(
      'Test callback: status=' + status + ', data=' + JSON.stringify(data)
    );

    expect(data[0].brukernavn).toEqual('ole');
  }

  commentDao.getComments(1, callback);
  done();
});


test('Testing if adding one comment works', done => {
  function callback(status, data) {
    console.log(
      'Test callback: status=' + status + ', data=' + JSON.stringify(data)
    );
  }

  commentDao.addComment({ brukernavn: 'ole', kommentar: 'kommentar', sak_id: '2' }, callback);

  // after adding comment, check if this comment was added
  function callback2(status, data) {
    expect(data.rows).toBe(1);
  }

  commentDao.getComments(2, callback2);

  done();
});


// ---Test for ratingDao---

test('Testing if you get the correct number of likes, getLikesFromCase', done => {
  function callback(status, data) {
    console.log(
      'Test callback: status=' + status + ', data=' + JSON.stringify(data)
    );
    // checking for 2 likes
    expect(data.likes).toBe(2);
  }

  ratingDao.getLikesFromCase('1', callback);
  done();
});

test('Testing if you get the correct number of dislikes, getDislikesFromCase', done => {
  function callback(status, data) {
    console.log(
      'Test callback: status=' + status + ', data=' + JSON.stringify(data)
    );

    expect(data.dislikes).toBe(1);
  }

  ratingDao.getDislikesFromCase('1', callback);
  done();
});


test('Testing if liking one case works', done => {
  function callback(status, data) {
    console.log(
      'Test callback: status=' + status + ', data=' + JSON.stringify(data)
    );
  }

  ratingDao.likeCase('1', callback);

  // Then call getDislikes to check if it has increased by 1
  function callback2(status, data) {
    expect(data.likes).toBe(3);
  }

  ratingDao.getLikesFromCase('1', callback2);

  done();

});

test('Testing if disliking one case works', done => {
  function callback(status, data) {
    console.log(
      'Test callback: status=' + status + ', data=' + JSON.stringify(data)
    );
  }

  ratingDao.dislikeCase('1', callback);

  // Then call getDislikes to check if it has increased by 1
  function callback2(status, data) {
    expect(data.dislikes).toBe(2);
  }

  ratingDao.getDislikesFromCase('1', callback2);

  done();

});

