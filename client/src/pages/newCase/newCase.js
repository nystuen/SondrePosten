// @flow

import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import * as React from 'react';
import './newCase.css';
import { TextHeader } from '../../components/textHeader/textHeader';
import {caseService} from '../../services';
import { history } from '../../index';
import { CaseObject, Category } from '../../components/types/types';
import { Alert } from '../../components/alerts/alerts';
import { Button } from '../../components/button/button';
import { CategoriesList } from '../../components/categoriesList/categoriesList';
import StringInput from '../../components/textField/stringInput';
import {Row} from '../../components/row/row';
import {Col} from '../../components/col/col';
import ImportanceList from '../../components/importanceList/importanceList';
import {DateTime} from '../../components/types/types';

export class NewCase extends Component {
  case: CaseObject = new CaseObject('', '', '', '', '', '', 1);

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
      (this.viktighetValue !== '')
    );
  };

  handleSubmit = () => {

    if (this.validateForm()) {
      let datetime = new DateTime();
      // $FlowFixMe
      let katValue = document.getElementById('kat').value;
      let newCase = new CaseObject(
        this.overskriftValue,
        this.bildeValue,
        this.bildetekstValue,
        // $FlowFixMe
        datetime.dateTime,
        this.innholdValue,
        katValue,
        // $FlowFixMe
        this.viktighetValue
      );
      
      caseService.addCase(newCase).then(res => {
        console.log(res);
        // $FlowFixMe
        console.log(res.data);
        this.case = newCase;
      });

       setTimeout(() =>  history.push('/kat/' + newCase.kategori), 1000);

    } else {
      Alert.danger('Du har ikke skrevet inn din sak i riktig format.');
    }
  };
// react version 16.6.0
  render() {
    console.log(React.version);
    return (
      <div className="container-large regCase">
        <TextHeader text="Registrer en ny sak" />

        <StringInput title={"Overskrift"} id="overskriftInput" name="overskriftInput" onChange={value => (this.overskriftValue = value)}/>
        <StringInput title={"Bildeadresse"} id="bildeInput" name="bildeInput"  onChange={value => (this.bildeValue = value)}/>
        <StringInput title={"Bildetekst"} id="bildetekstInput" name="bildetekstInput" onChange={value => (this.bildetekstValue = value)}/>
        <StringInput textArea={true} title={"Innhold"} id="innholdInput" name="innholdInput" onChange={value => (this.innholdValue = value)}/>


        <Row>
          <Col md={6}>
            <label htmlFor="sel1">Kategorier</label>
            <CategoriesList />
          </Col>

          <Col md={6}>
            <label htmlFor="sel2">Viktighet</label>
            <ImportanceList onChange={value => (this.viktighetValue = value)}/>
          </Col>
        </Row>

        <div className="topPadding">
          <Button onClick={() => {this.handleSubmit();}} type="primary">Registrer</Button>
        </div>

      </div>
    );
  }
}
