// @flow

import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import * as React from 'react';
import '../newCase/newCase.css';
import { TextHeader } from '../../textHeader/textHeader';
import { caseService } from '../../../services';
import { history } from '../../../index';
import { CaseObject, Category } from '../../types/types';
import { Alert } from '../../alerts/alerts';
import { Button } from '../../button/button';
import { CategoriesList } from '../../categoriesList/categoriesList';
import css from './editCase.css';
import Card from '../../card/card';

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

  handleSubmit = () => {
    console.log('validate: ', this.validateForm());

    if (this.validateForm()) {
      /*  // $FlowFixMe
        let overskriftValue = document.getElementById('overskriftInput').value;
        // $FlowFixMe
        let bildeValue = document.getElementById('bildeInput').value;
        // $FlowFixMe
        let bildetekstValue = document.getElementById('bildetekstInput').value;
        // $FlowFixMe
        let innholdValue = document.getElementById('innholdInput').value;
        // $FlowFixMe
        let viktighetValue = document.getElementById('viktighet').value;
        // $FlowFixMe
        */
      let katValue = document.getElementById('kat').value;

      /* let newCase =
        'overskriftInput': overskriftValue,
        'innholdInput': innholdValue,
        'bildetekstInput': bildetekstValue,
        'bildeInput': bildeValue,
        'viktighetInput': viktighetValue,
        'kategoriInput': katValue
      };
      */

      let newCase = new CaseObject(
        this.overskriftValue,
        this.bildeValue,
        this.bildetekstValue,
        this.innholdValue,
        katValue,
        // $FlowFixMe
        this.viktighetValue
      );

      console.log('DETTE ER EN ID', newCase.id);

      caseService
        .editCase(newCase, this.props.match.params.id)
        .then(history.push('/sak/' + this.props.match.params.id))
        .catch((error: Error) => Alert.danger(error.message));
    } else {
      Alert.danger('Du har ikke skrevet inn din sak i riktig format.');
    }
  };

  render() {
    return (
      <div className="case editCase">
        {this.cases.map(s => (
          <div className="container-large">
            <TextHeader text="Endre sak" />
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
                value={s.overskrift}
                defaultValue={s.overskrift}
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
                defaultValue={s.bilde}
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
                defaultValue={s.bildetekst}
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
                rows="3"
                id="innholdInput"
                name="innholdInput"
                defaultValue={s.innhold}
                onChange={evt => (this.innholdValue = evt.target.value)}
              />
            </div>

            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="sel1">Kategorier</label>
                <CategoriesList currentCat={s.kategori[0].toUpperCase() + s.kategori.substring(1)} />
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="sel2">Viktighet</label>
                <select
                  className="form-control"
                  id="viktighet"
                  name="viktighet"
                  defaultValue={s.viktighet}
                  onChange={evt => (this.viktighetValue = evt.target.value)}
                >
                  <option value=''>Velg viktighet</option>
                  <option name="viktig" value={1}>
                    Viktig
                  </option>
                  <option name="ikkeViktig" value={2}>
                    Ikke like viktig
                  </option>
                </select>
              </div>
            </div>

            <Button
              onClick={() => {
                this.handleSubmit();
              }}
              type="primary"
            >
              Lagre endringer
            </Button>
          </div>
        ))}
      </div>
    );
  }
}
