// @flow

import { Component } from 'react-simplified';
import * as React from 'react';
import { TextHeader } from '../textHeader/textHeader';
import Button from '../button/button';
import css from './comment.css';
import { caseService } from '../../services';
import { history } from '../../index';


export class AddComment extends Component<{ id: number }> {

  handleSubmit = () => {
    let newComment = {
      'sak_id': this.props.id,
      // $FlowFixMe
      'brukernavn': document.getElementById('brukernavnInput').value,
      // $FlowFixMe
      'kommentar': document.getElementById('kommentarInput').value
    };

    caseService.addComment(newComment)
      .then(res => {
        console.log(res);
        // $FlowFixMe
        console.log(res.data);
        history.go(0);
      });

  };

  render() {
    return (
      <span>
        <button className="btn btn-primary" type="button" data-toggle="collapse" data-target="#collapseExample2"
                aria-expanded="false" aria-controls="collapseExample2">Legg til en kommentar</button>
        <div className="collapse" id="collapseExample2">

          <div className="card detailBox form-group" >
            <div className="card-header"><h4>Legg til en kommentar</h4></div>
            <div className="card-block">
              <input placeholder="Brukernavn" type="text" className="form-control" id="brukernavnInput"/>
            </div>
            <div className="card-block">
              <textarea placeholder="Kommentar" className="form-control" rows="5" id="kommentarInput"/>
              <button onClick={() => this.handleSubmit()} className="btn btn-light">Legg ut kommentar</button>
            </div>
          </div>
        </div>
      </span>
    );
  }
}