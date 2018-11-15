// @flow

import { Students, sync } from '../src/models.js';
import CaseDao from '../src/dao/casedao';
import mysql from "mysql";
import runsqlfile from '../src/dao/testing/runsqlfile';

// GitLab CI Pool
var pool = mysql.createPool({
  connectionLimit: 1,
  host: "mysql",
  user: "root",
  password: "secret",
  database: "supertestdb",
  debug: false,
  multipleStatements: true
});
const caseDao = new CaseDao(pool);

beforeAll(done => {
  runsqlfile('create_tables.sql', pool, () => {
    runsqlfile('create_testdata.sql', pool, done);
  });
});

afterAll(() => {
  pool.end();
});


test("get one person from db", done => {
  function callback(status, data) {
    console.log(
      "Test callback: status=" + status + ", data=" + JSON.stringify(data)
    );
    expect(data.length).toBe(5);
    expect(data[0].navn).toBe("Annet");
    done();
  }

  caseDao.getCategories(callback);
});

