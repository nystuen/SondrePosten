// @flow

import { Component } from 'react-simplified';
import * as React from 'react';
import { TextHeader } from '../textHeader/textHeader';
import Button from '../button/button';
import css from './comment.css';
import { caseService } from '../../services';
import { history } from '../../index';
import { Alert } from '../alerts/alerts';
import { CommentObject } from '../types/types';

export class Comments extends Component<{ id: number }> {
  comments: CommentObject[] = [];

  // get comments on mount
  componentDidMount() {
    caseService
      .getComments(this.props.id)
      // $FlowFixMe
      .then(comments => (this.comments = comments.data))
      .catch((error: Error) => Alert.danger(error.message));
  }

  handleSubmit = () => {
    let sak_id = '' + this.props.id;
    // $FlowFixMe
    let brukernavn = document.getElementById('brukernavnInput').value;
    // $FlowFixMe
    let kommentar = document.getElementById('kommentarInput').value;

    // create new commentObject
    let newComment = new CommentObject(sak_id, brukernavn, kommentar);

    // update comments component
    let tempComments = this.comments;
    tempComments.push(newComment);
    this.comments = tempComments;

    // add commentObject to db
    caseService.addComment(newComment).catch((error: Error) => Alert.danger(error.message));
  };

  render() {
    return (
      <div>
        <button
          className="btn btn-primary"
          data-toggle="collapse"
          data-target="#collapseExample2"
          aria-expanded="false"
          aria-controls="collapseExample2"
        >
          Legg til en kommentar
        </button>

        <div className="collapse" id="collapseExample2">
          <div className="card detailBox form-group">
            <div className="card-header">
              <h4>Legg til en kommentar</h4>
            </div>
            <div className="card-block">
              <input placeholder="Brukernavn" type="text" className="form-control" id="brukernavnInput" />
            </div>
            <div className="card-block">
              <textarea placeholder="Kommentar" className="form-control" rows="5" id="kommentarInput" />
              <button
                onClick={() => {
                  this.handleSubmit();
                }}
                className="btn btn-light"
                data-toggle="collapse"
                data-target="#collapseExample2"
                aria-expanded="false"
                aria-controls="collapseExample2"
              >
                Legg ut kommentar
              </button>
            </div>
          </div>
        </div>

        <div className="comments">
          {/* dette er en kommentar */}
          {this.comments.map(thisComment => (
            <div key={thisComment.id + 1} className="singleComment">
              <h3 className="userComment">{thisComment.brukernavn}</h3>
              <p>{thisComment.kommentar}</p>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
