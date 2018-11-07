// @flow

module.exports = class Dao {
    pool: Object;

    constructor(pool: Object) {
        // Dependency Injection
        this.pool = pool;
    }

    query(sql: string, params: Object, callback: Function) {
        this.pool.getConnection((err, connection) => {
            console.log("dao: connected to db");
            if (err) {
                console.log("dao: error connecting to db");
                callback(500, {error: "error connecting to db"});
            } else {
                console.log("dao: running sql: " + sql);
                connection.query(sql, params, (err, rows) => {
                    connection.release();
                    if (err) {
                        console.log(err);
                        callback(500, {error: " error querying"});
                    } else {
                        console.log("dao: returning rows");
                        callback(200, rows);
                    }
                });
            }
        });
    };
};