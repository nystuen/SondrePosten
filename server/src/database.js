// @flow

import mysql from "mysql";

export const pool = mysql.createPool({
    connectionLimit: 5,
    host: 'mysql.stud.iie.ntnu.no',
    user: 'aadneny',
    password: '4jzYVq7M',
    database: 'aadneny',
    debug: false

});