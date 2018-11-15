// @flow

const Dao = require('./dao');

module.exports = class CommentDao extends Dao {

  getComments(id: string, callback: Function) {
    super.query(
      "SELECT id, sak_id, brukernavn, kommentar FROM sak_kommentar_bruker WHERE sak_id=?",
      [id],
      callback
    );
  }

  addComment(json: Object, callback: Function) {
    let val = [json.sak_id, json.brukernavn, json.kommentar];
    super.query(
      "insert into sak_kommentar_bruker (sak_id, brukernavn, kommentar) values (?,?,?)",
      val,
      callback
    );
  }
};