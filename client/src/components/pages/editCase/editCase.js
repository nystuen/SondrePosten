// @flow

import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import * as React from 'react';
import '../editCase/newCase.css';
import { TextHeader } from '../../textHeader/textHeader';
import { caseService } from '../../../services';
import { history } from '../../../index';
import { CaseObject, Category } from '../../types/types';
import { Alert } from '../../../widgets';
import { Button } from '../../button/button';
import { CategoriesList } from '../../categoriesList/categoriesList';
import Card from '../../card/card';


export class EditCase extends Component<{ match: { params: { id: number } } }> {

  cases: CaseObject[] = [];
  id = this.props.match.params.id;

  componentDidMount() {
    caseService
      .getCase(this.props.match.params.id)
      // $FlowFixMe
      .then(cases => (this.cases = cases.data))
      .then(console.log('overskrift: ', this.cases))
      .catch((error: Error) => Alert.danger(error.message));
  }

  handleSubmit = () => {
    // $FlowFixMe
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

    let newCase = new CaseObject(overskriftValue, bildeValue, bildetekstValue, innholdValue, katValue, viktighetValue);
    newCase.id = this.id;


    caseService
      .editCase(newCase)
      .then(Alert.success('Endringene er lagret.'))
      .then(history.push('/case/' + this.id))
      .catch((error: Error) => Alert.danger(error.message));

  };

  render() {
    return (
      <div className="case">
        {this.cases.map(s => (
          <div className="container-large">
            <TextHeader text="Endre sak"/>
            <div className="input-group input-group-mb mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Overskrift</span>
              </div>
              <input type="text" className="form-control" placeholder="" aria-label="Overskrift"
                     aria-describedby="basic-addon1" id="overskriftInput" name="overskriftInput"
                     defaultValue={s.overskrift}/>
            </div>

            <div className="input-group input-group-mb mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Bildeadresse</span>
              </div>
              <input type="text" className="form-control" placeholder="" aria-label="bildeValue"
                     aria-describedby="basic-addon1" id="bildeInput" name="bildeInput" defaultValue={s.bilde}/>
            </div>

            <div className="input-group input-group-mb mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Bildetekst</span>
              </div>
              <input type="text" className="form-control" placeholder="" aria-label="Bildetekst"
                     aria-describedby="basic-addon1" id="bildetekstInput" name="bildetekstInput"
                     defaultValue={s.bildetekst}/>
            </div>

            <div className="input-group input-group-mb mb-3">
              <div className="input-group-prepend">
                <span className="input-group-text" id="basic-addon1">Innhold</span>
              </div>
              <textarea type="text" className="form-control" placeholder=""
                        aria-label="innhold" aria-describedby="basic-addon1" rows="3"
                        id="innholdInput" name="innholdInput" defaultValue={s.innhold} />
            </div>

            <div className="row">
              <div className="form-group col-md-6">
                <label htmlFor="sel1">Kategorier</label>
                <CategoriesList currentCat={s.kategori[0].toUpperCase() + s.kategori.substring(1)}/>
              </div>

              <div className="form-group col-md-6">
                <label htmlFor="sel2">Viktighet</label>
                <select className="form-control" id="viktighet" name="viktighet" defaultValue={s.viktighet}>
                  <option name="viktig" value={1}>Viktig</option>
                  <option name="ikkeViktig" value={2}>Ikke like viktig</option>
                </select>
              </div>
            </div>

            <Button onClick={() => {
              this.handleSubmit();
            }} type="primary">Lagre endringer</Button>
          </div>

        ))}
      </div>
    );
  }
}