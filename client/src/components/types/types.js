//@flow


export class CaseObject {
  id: ?number;
  overskrift: string;
  bilde: string;
  bildetekst: string;
  tidspunkt: ? string;
  innhold: string;
  kategori: string;
  viktighet: number;

  constructor(
    overskrift: string,
    bilde: string,
    bildetekst: string,
    innhold: string,
    kategori: string,
    viktighet: number) {
    this.overskrift = overskrift;
    this.bilde = bilde;
    this.bildetekst = bildetekst;
    this.innhold = innhold;
    this.kategori = kategori;
    this.viktighet = viktighet;
  }

  setId(id: number){
    this.id = id;
  }

  getId(){
    return this.id;
  }
}

export class CommentObject {
  id: ? string;
  sak_id: string;
  brukernavn: string;
  kommentar: string;

  constructor(sak_id: string, brukernavn: string, kommentar: string) {
    this.sak_id = sak_id;
    this.brukernavn = brukernavn;
    this.kommentar = kommentar;
  }
}

export class Category {
  kategori: string;

  constructor(kategori: string) {
    this.kategori = kategori;
  }
}

export class RatingObject {
  rating: number;
  sak_id: number;

  constructor(rating: number, sak_id: number) {
    this.rating = rating;
    this.sak_id = sak_id;
  }
}