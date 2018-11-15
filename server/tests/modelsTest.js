// @flow

import { Students, sync } from '../src/models.js';
import CaseDao from '../src/dao/casedao';
import mysql from "mysql";
let caseDao;

beforeAll(async () => {

});

describe('Sak test', () => {

  const pool = mysql.createPool({
    connectionLimit: 5,
    host: 'mysql.stud.iie.ntnu.no',
    user: 'aadneny',
    password: '4jzYVq7M',
    database: 'aadneny',
    debug: false

  });
  caseDao = new CaseDao(pool);

  it('Get categories', async () => {
    let saker = [];
    caseDao.getCategories((status: number, data: Object) => {
      saker = data.data;
    });
    expect(saker.length).toBe(5);
  })

});

describe('Students test', () => {
  it('correct data', async () => {
    let students = await Students.findAll();
    expect(
      students.map(student => student.toJSON()).map(student => ({
        id: student.id,
        firstName: student.firstName,
        lastName: student.lastName,
        email: student.email
      }))
    ).toEqual([
      {
        id: 1,
        firstName: 'Ola',
        lastName: 'Jensen',
        email: 'ola.jensen@ntnu.no'
      },
      {
        id: 2,
        firstName: 'Kari',
        lastName: 'Larsen',
        email: 'kari.larsen@ntnu.no'
      }
    ]);
  });
});
