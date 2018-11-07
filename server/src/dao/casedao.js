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
            "select id, overskrift, bilde from sak where kategori LIKE ? ORDER BY `sak`.`tidspunkt` DESC",
            [kat],
            callback
        );
    }

    getOneCase(id, callback) {
        super.query(
            "select id, overskrift, bildetekst, bilde, innhold, tidspunkt FROM sak WHERE id=?",
            [id],
            callback
        );
    }

    getNewestCasesForLiveFeed(callback) {
        super.query(
            "SELECT id, overskrift, tidspunkt FROM sak ORDER BY `sak`.`tidspunkt` DESC limit 5",
            [],
            callback
        );
    }

    getHeadersAndPicturesFromImportantCases(callback) {
        super.query(
            "select id, overskrift, bilde from sak WHERE viktighet=1 ORDER BY `sak`.`tidspunkt` DESC",
            [],
            callback
        );
    }


    deleteOneCase(json, callback) {
        let val = [json.overskriftInput, json.tidspunktInput];
        super.query(
            "DELETE FROM sak WHERE overskrift LIKE ? AND tidspunkt LIKE ?",
            val,
            callback);
    }

    getComments(id, callback) {
        super.query(
            "SELECT sak_id, brukernavn, kommentar FROM sak_kommentar_bruker WHERE sak_id=?",
            [id],
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

    addComment(json, callback) {
        let val = [json.sak_id, json.brukernavn, json.kommentar];
        super.query(
            "insert into sak_kommentar_bruker (sak_id, brukernavn, kommentar) values (?,?,?)",
            val,
            callback
        );
    }
};