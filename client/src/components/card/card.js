// @flow

import { Component } from 'react-simplified';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../button/button';
import css from './card.css';
import { CaseObject, RatingObject } from '../types/types';
import { caseService } from '../../services';
import { Alert } from '../alerts/alerts';

export class Card extends Component<{
  case: CaseObject
}> {
  id = this.props.case.id;
  likes: number = 0;
  dislikes: number = 0;

  componentDidMount() {
    caseService
      // $FlowFixMe
      .getLikes(this.id)
      // $FlowFixMe
      .then(likes => (this.likes = likes.data[0].likes));

    caseService
      // $FlowFixMe
      .getDislikes(this.id)
      // $FlowFixMe
      .then(dislikes => (this.dislikes = dislikes.data[0].dislikes));
  }

  handleLike = () => {
    // $FlowFixMe
    let newRating = new RatingObject(1, this.id);

    caseService
      // $FlowFixMe
      .likeCase(newRating)
      .catch((error: Error) => Alert.danger(error.message));

    this.likes++;
  };

  handleDislike = () => {
    // $FlowFixMe
    let newRating = new RatingObject(1, this.id);

    caseService
      // $FlowFixMe
      .dislikeCase(newRating)
      .catch((error: Error) => Alert.danger(error.message));

    this.dislikes++;
  };

  render() {
    return (
      <div>
        <div className="card" styles="width: 18rem;">
          <img className="card-img-top" src={this.props.case.bilde} alt="Card image cap" />
          <div className="card-body">
            <div className="d-flex mb-3">
              <div className="mr-auto p-2 ">
                <p>Lansert: {this.props.case.tidspunkt}</p>
              </div>
              <div className="p-2">
                <Button
                  type="success"
                  id="likeBtn"
                  onClick={() => {
                    this.handleLike();
                  }}
                >
                  {this.likes} <i className="fas fa-thumbs-up" />
                </Button>
              </div>
              <div className="p-2">
                <Button
                  type="danger"
                  id="dislikeBtn"
                  onClick={() => {
                    this.handleDislike();
                  }}
                >
                  {this.dislikes} <i className="fas fa-thumbs-down" />
                </Button>
              </div>
            </div>

            <h4 className="card-title">{this.props.case.overskrift}</h4>
            <h5 className="card-text">{this.props.case.bildetekst}</h5>
            <hr />
            <p className="card-text">{this.props.case.innhold}</p>
            <a
              className="d-flex justify-content-end"
              href="/#/"
              data-toggle="collapse"
              data-target="#admin"
              aria-expanded="false"
              aria-controls="admin"
            >
              <i className="admin fas fa-cog. fa-2x" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
