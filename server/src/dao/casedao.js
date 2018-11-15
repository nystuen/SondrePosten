// @flow

const Dao = require('./dao');

module.exports = class CaseDao extends Dao {

  getAllHeadersAndPictures(callback: Function) {
    super.query(
      'select id, overskrift, bilde from sak',
      [],
      callback
    );
  }

  getAllFromOneKat(kat: string, callback: Function) {
    super.query(
      'select id, overskrift, bilde from sak WHERE aktiv = 1 AND kategori LIKE ? ORDER BY `sak`.`tidspunkt` DESC ',
      [kat],
      callback
    );
  }

  getOneCase(id: string, callback: Function) {
    super.query(
      'select id, overskrift, bildetekst, bilde, innhold, tidspunkt FROM sak WHERE aktiv = 1 AND id=?',
      [id],
      callback
    );
  }

  getNewestCasesForLiveFeed(callback: Function) {
    super.query(
      'SELECT id, overskrift, tidspunkt FROM sak WHERE aktiv = 1 ORDER BY `sak`.`tidspunkt` DESC limit 5',
      [],
      callback
    );
  }

  getHeadersAndPicturesFromImportantCases(callback: Function) {
    super.query(
      'select id, overskrift, bilde from sak WHERE aktiv = 1 AND viktighet=1 ORDER BY `sak`.`tidspunkt` DESC',
      [],
      callback
    );
  }

  regNewCase(json: Object, callback: Function) {
    let val = [json.overskrift, json.bildetekst, json.innhold, json.tidspunkt, json.bilde, json.kategori, json.viktighet];
    console.log('overksrift: ', val[0]);
    super.query(
      'insert into sak (aktiv, overskrift, bildetekst, innhold, tidspunkt, bilde, kategori, viktighet) values (1, ?,?,?,?,?,?,?)',
      val,
      callback
    );
  }

  getCategories(callback: Function) {
    super.query(
      'SELECT kategori FROM kategori ORDER BY kategori DESC',
      [],
      callback
    );
  }

  setCaseAsInactive(id: string, callback: Function) {
    super.query(
      'UPDATE sak SET aktiv = 0 WHERE id=?',
      [id],
      callback
    );
  }

  deleteOneCase(json: Object, callback: Function) {
    let val = [json.overskriftInput, json.tidspunktInput];
    super.query(
      'DELETE FROM sak WHERE overskrift LIKE ? AND tidspunkt LIKE ?',
      val,
      callback);
  }

};