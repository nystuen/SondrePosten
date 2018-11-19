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


export class NewCase extends Component {

  case: CaseObject = new CaseObject('', '', '', '', '',0);

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


    caseService.addCase(newCase)
      .then(res => {
        console.log(res);
        // $FlowFixMe
        console.log(res.data);
        this.case = newCase;
      });

    history.push('/kat/' + newCase.kategori);

  };

  render() {
    return (
      <div className="container-large">
        <TextHeader text="Registrer en ny sak"/>
        <div className="input-group input-group-mb mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">Overskrift</span>
          </div>
          <input type="text" className="form-control" placeholder="" aria-label="Overskrift"
                 aria-describedby="basic-addon1" id="overskriftInput" name="overskriftInput"/>
        </div>


        <div className="input-group input-group-mb mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">Bildeadresse</span>
          </div>
          <input type="text" className="form-control" placeholder="" aria-label="bildeValue"
                 aria-describedby="basic-addon1" id="bildeInput" name="bildeInput"/>
        </div>

        <div className="input-group input-group-mb mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">Bildetekst</span>
          </div>
          <input type="text" className="form-control" placeholder="" aria-label="Bildetekst"
                 aria-describedby="basic-addon1" id="bildetekstInput" name="bildetekstInput"/>
        </div>

        <div className="input-group input-group-mb mb-3">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">Innhold</span>
          </div>
          <textarea type="text" className="form-control" placeholder="" aria-label="innhold"
                    aria-describedby="basic-addon1" id="innholdInput" name="innholdInput"/>
        </div>

        <div className="row">
          <div className="form-group col-md-6">
            <label htmlFor="sel1">Kategorier</label>
            <CategoriesList />
          </div>

          <div className="form-group col-md-6">
            <label htmlFor="sel2">Viktighet</label>
            <select className="form-control" id="viktighet" name="viktighet">
              <option value={1}>Viktig</option>
              <option value={2}>Ikke like viktig</option>
            </select>
          </div>
        </div>

        <Button onClick={() => {
          this.handleSubmit();
        }} type="primary">Registrer</Button>
      </div>
    );
  }
}