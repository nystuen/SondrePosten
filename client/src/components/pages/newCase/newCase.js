// @flow

import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import * as React from 'react';
import './newCase.css';
import { TextHeader } from '../../textHeader/textHeader';
import { caseService } from '../../../services';
import { history } from '../../../index';
import { CaseObject, Category } from '../../types/types';
import { Alert } from '../../alerts/alerts';
import { Button } from '../../button/button';
import { CategoriesList } from '../../categoriesList/categoriesList';

export class NewCase extends Component {
  case: CaseObject = new CaseObject('', '', '', '', '', 0);

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

  handleSubmit = () => {
    console.log('validate: ', this.validateForm());

    if (this.validateForm()) {
      // $FlowFixMe
      let katValue = document.getElementById('kat').value;
      let newCase = new CaseObject(
        this.overskriftValue,
        this.bildeValue,
        this.bildetekstValue,
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

      history.push('/kat/' + newCase.kategori);
    } else {
      Alert.danger('Du har ikke skrevet inn din sak i riktig format.');
    }
  };

  render() {
    return (
      <div className="container-large regCase">
        <TextHeader text="Registrer en ny sak" />

        <div className="input-group input-group-mb mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              Overskrift
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder=""
            aria-label="Overskrift"
            aria-describedby="basic-addon1"
            id="overskriftInput"
            name="overskriftInput"
            onChange={evt => (this.overskriftValue = evt.target.value)}
          />
        </div>

        <div className="input-group input-group-mb mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              Bildeadresse
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder=""
            aria-label="bildeValue"
            aria-describedby="basic-addon1"
            id="bildeInput"
            name="bildeInput"
            onChange={evt => (this.bildeValue = evt.target.value)}
          />
        </div>

        <div className="input-group input-group-mb mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              Bildetekst
            </span>
          </div>
          <input
            type="text"
            className="form-control"
            placeholder=""
            aria-label="Bildetekst"
            aria-describedby="basic-addon1"
            id="bildetekstInput"
            name="bildetekstInput"
            onChange={evt => (this.bildetekstValue = evt.target.value)}
          />
        </div>

        <div className="input-group input-group-mb mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              Innhold
            </span>
          </div>
          <textarea
            type="text"
            className="form-control"
            placeholder=""
            aria-label="innhold"
            aria-describedby="basic-addon1"
            id="innholdInput"
            name="innholdInput"
            rows="3"
            onChange={evt => (this.innholdValue = evt.target.value)}
          />
        </div>

        <div className="row">
          <div className="form-group col-md-6">
            <label htmlFor="sel1">Kategorier</label>
            <CategoriesList />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="sel2">Viktighet</label>
            <select
              className="form-control"
              id="viktighet"
              name="viktighet"
              onChange={evt => (this.viktighetValue = evt.target.value)}
            >
              <option value="">Velg viktighet</option>
              <option value={1}>Viktig</option>
              <option value={2}>Ikke like viktig</option>
            </select>
          </div>
        </div>

        <Button
          onClick={() => {
            this.handleSubmit();
          }}
          type="primary"
        >
          Registrer
        </Button>
      </div>
    );
  }
}
