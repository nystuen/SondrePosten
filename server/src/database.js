// @flow

import mysql from 'mysql';

const config = require('getconfig');

export const pool = mysql.createPool({
  connectionLimit: 5,
  host: 'mysql.stud.iie.ntnu.no',
  user: 'aadneny',
  password: config.db_password,
  database: 'aadneny',
  debug: false
});

