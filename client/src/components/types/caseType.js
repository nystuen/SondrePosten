export class CaseObject {
    id: number;
    overskrift: string;
    bilde: string;
    bildetekst: string;
    innhold: string;
    kategori: string;
    viktighet: number;
}

export class Comment {
    sak_id: number;
    brukernavn: string;
    kommentar: string;
}