const Dao = require('./dao');


module.exports = class RatingDao extends Dao {

    getRatingFromCase(id, callback) {
        super.query(
            "select AVG(rating) FROM sak_bruker_rating WHERE sak_id =?",
            [id],
            callback
        );
    }

    rateCase(json, callback) {
        let val = [json.sak_id, json.bruker_id, json.rating];
        super.query(
            "INSERT INTO sak_bruker_rating (sak_id, bruker_id, rating)" +
            "VALUES(?,?,?);",
            val,
            callback
        );
    }

};