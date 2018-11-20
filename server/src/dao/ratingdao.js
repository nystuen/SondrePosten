// @flow

const Dao = require('./dao');

module.exports = class RatingDao extends Dao {
  getLikesFromCase(id: string, callback: Function) {
    super.query(
      'SELECT COUNT(*) AS likes FROM sak_rating WHERE rating = 1 AND sak_id=?',
      [id],
      callback
    );
  }

  getDislikesFromCase(id: string, callback: Function) {
    super.query(
      'SELECT COUNT(*) AS dislikes FROM sak_rating WHERE rating = (-1) AND sak_id=?',
      [id],
      callback
    );
  }

  likeCase(id: string, callback: Function) {
    super.query(
      'INSERT INTO sak_rating (sak_id, rating) VALUES(?,1)',
      [id],
      callback
    );
  }

  dislikeCase(id: string, callback: Function) {
    super.query(
      'INSERT INTO sak_rating (sak_id, rating) VALUES(?,-1)',
      [id],
      callback
    );
  }
};
