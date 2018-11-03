const Dao = require('./dao');

module.exports = class CaseDao extends Dao {

    getAllHeadersAndPictures(callback) {
        super.query(
            "select id, overskrift, bilde from sak",
            [],
            callback
        );
    }

    getAllFromOneKat(kat, callback) {
        super.query(
            "select id, overskrift, bilde from sak where kategori LIKE ?",
            [kat],
            callback
        );
    }

    getOneCase(id, callback) {
        super.query(
            "select id, overskrift, bilde, innhold, tidspunkt FROM sak WHERE id=?",
            [id],
            callback
        );
    }

    getHeadersAndPicturesFromImportantCases(callback) {
        super.query(
            "select id, overskrift, bilde from sak WHERE viktighet=1",
            [],
            callback
        );
    }



    regNewCase(json, callback) {
        let val = [json.overskriftInput, json.innholdInput, json.tidspunktInput, json.bildeInput, json.kategoriInput, json.viktighetInput];
        super.query(
            "insert into sak (overskrift, innhold, tidspunkt, bilde, kategori, viktighet) values (?,?,?,?,?,?)",
            val,
            callback
        );
    }

    deleteOneCase(json, callback){
        let val = [json.overskriftInput, json.tidspunktInput];
        super.query(
            "DELETE FROM sak WHERE overskrift LIKE ? AND tidspunkt LIKE ?",
            val,
            callback);
    }







};