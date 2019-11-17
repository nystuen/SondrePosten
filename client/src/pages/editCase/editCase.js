// @flow

import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import * as React from 'react';
import '../newCase/newCase.css';
import { TextHeader } from '../../components/textHeader/textHeader';
import { caseService } from '../../services';
import { history } from '../../index';
import { CaseObject, Category } from '../../components/types/types';
import { Alert } from '../../components/alerts/alerts';
import { Button } from '../../components/button/button';
import { CategoriesList } from '../../components/categoriesList/categoriesList';
import css from './editCase.css';
import Card from '../../components/card/card';
import StringInput from '../../components/textField/stringInput';
import {Row} from '../../components/row/row';
import {Col} from '../../components/col/col';
import ImportanceList from '../../components/importanceList/importanceList';
import {DateTime} from '../../components/types/types';
import { UploadImage } from '../../components/uploadImage/uploadImage';


export class EditCase extends Component<{ match: { params: { id: number } } }> {
  cases: CaseObject[] = [];

  overskriftValue = '';
  bildeValue = '';
  bildetekstValue = '';
  innholdValue = '';
  viktighetValue = '';

  validateForm = () => {
    return (
      this.overskriftValue !== '' &&
      this.bildeValue !== '' &&
      this.bildetekstValue !== '' &&
      this.innholdValue !== '' &&
      this.viktighetValue !== ''
    );
  };

  componentDidMount() {
    caseService
      .getCase(this.props.match.params.id)
      .then(cases => {
        // $FlowFixMe
        this.cases = cases.data;
        this.overskriftValue = this.cases[0].overskrift;
        this.bildeValue = this.cases[0].bilde;
        this.bildetekstValue = this.cases[0].bildetekst;
        this.innholdValue = this.cases[0].innhold;
        this.viktighetValue = this.cases[0].viktighet;
      })
      .then(console.log('overskrift: ', this.cases))
      .catch((error: Error) => Alert.danger(error.message));
  }

  componentWillUnMount() {

  }

  handleSubmit = () => {

    if (this.validateForm()) {
      let datetime = new DateTime();
      // $FlowFixMe
      let katValue = document.getElementById('kat').value;
      let newCase = new CaseObject(
        this.overskriftValue,
        // $FlowFixMe
        this.bildeValue.fileName,
        this.bildetekstValue,
        // $FlowFixMe
        datetime.dateTime,
        this.innholdValue,
        katValue,
        // $FlowFixMe
        this.viktighetValue
      );
      caseService
        .editCase(newCase, this.props.match.params.id)
        .then(history.push('/sak/' + this.props.match.params.id))
        .catch((error: Error) => Alert.danger(error.message));
    } else {
      Alert.danger('Du har ikke skrevet inn din sak i riktig format.');
    }
  };

  getImage = (s: CaseObject) => {
    if(typeof this.bildeValue.fileName === 'undefined'){
      console.log('undefined');
      return <div className="card" styles="width: 18rem;">
        <img id={'caseImage'} className="card-img-top" src={this.bildeValue} alt="Sakens bilde" />
      </div>
    } else if(this.bildeValue !== ''){
      console.log('not undefined');
      return <div className="card" styles="width: 18rem;">
        {/* $FlowFixMe*/}
        <img id={'caseImage'} className="card-img-top" src={this.bildeValue.fileName} alt="Sakens bilde" />
      </div>
    } else {
      return <span></span>
    }
  }

  render() {
    return (
      <div className="case editCase">
        {this.cases.map(s => (
          <div className="container-large">
            <TextHeader text="Endre sak" />
            <StringInput title={"Overskrift"} id="overskriftInput" name="overskriftInput" defaultValue={s.overskrift} onChange={value => (this.overskriftValue = value)}/>
            {this.getImage(s)}
            <UploadImage onChange={value => (this.bildeValue = value)}/>
            <StringInput title={"Bildetekst"} id="bildetekstInput" name="bildetekstInput" defaultValue={s.bildetekst} onChange={value => (this.bildetekstValue = value)}/>
            <StringInput textArea={true} title={"Innhold"} id="innholdInput" name="innholdInput" defaultValue={s.innhold} onChange={value => (this.innholdValue = value)}/>

            <Row>
              <Col md={6}>
                <label htmlFor="sel1">Kategorier</label>
                <CategoriesList currentCat={s.kategori[0].toUpperCase() + s.kategori.substring(1)} />
              </Col>

              <Col md={6}>
                <label htmlFor="sel2">Viktighet</label>
                <ImportanceList onChange={value => (this.viktighetValue = value)}/>
              </Col>
            </Row>
            <div className="topPadding">
              <Button
                onClick={() => {
                  this.handleSubmit();
                }}
                type="primary"
              >
                Lagre endringer
              </Button>
            </div>
          </div>
        ))}
      </div>
    );
  }
}
/*<StringInput title={"Bildeadresse"} id="bildeInput" name="bildeInput" defaultValue={s.bilde} onChange={value => (this.bildeValue = value)}/>*/