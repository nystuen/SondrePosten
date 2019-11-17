// @flow

import { Component } from 'react-simplified';
import * as React from 'react';
import { NavLink } from 'react-router-dom';
import Button from '../button/button';
import css from './card.css';
import { CaseObject, RatingObject } from '../types/types';
import { caseService } from '../../services';
import { Alert } from '../alerts/alerts';
import { Base64 } from 'js-base64';
export class Card extends Component<{
  case: CaseObject
}> {
  id = this.props.case.id;
  likes: number = 0;
  dislikes: number = 0;
  hasLiked: boolean = false;
  hasDisliked: boolean = false;
  hasVoted: boolean = false;
  timerActive: boolean = false;

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


  /**


   Liker sak
   this.likes++
   kan unlike innen 5 sek

  unliker? -> this.likes--
  hvis ikke -> {
    blir postet til databasen etter dette.
    hasVoted = true
  }


   prøver å dislike eller like sak -> this.Likes == true -> får ikke stemt.


   Disliker sak
   this.dislikes++
   kan undislike innen 5 sek

   undisliker? -> this.dislikes--
   hvis ikke -> {
    blir postet til databasen etter dette.
    hasVoted = true
  }

   prøver å dislike eller like sak -> this.Likes == true -> får ikke stemt.



    */
  handleLike = () => {
    if(!this.hasVoted){
      // $FlowFixMe
      let newRating = new RatingObject(1, this.id);

      caseService
      // $FlowFixMe
        .likeCase(newRating)
        .catch((error: Error) => Alert.danger(error.message));

      this.likes++;
      this.hasVoted = true;
    }
  };

  handleDislike = () => {
    if(!this.hasVoted){
      // $FlowFixMe
      let newRating = new RatingObject(1, this.id);
      
      caseService
      // $FlowFixMe
        .dislikeCase(newRating)
        .catch((error: Error) => Alert.danger(error.message));

      this.dislikes++;
      this.hasVoted = true;
    }
  };

  render() {
    return (
      <div>
        <div className="card" styles="width: 18rem;">
          <img className="card-img-top" src={this.props.case.bilde} alt="Sakens bilde" />
          <div className="card-body">
            <div className="d-flex mb-3">
              <div className="mr-auto p-2 ">
                <p alt="Tidspunkt">Lansert: {this.props.case.tidspunkt}</p>
              </div>
              <div className="p-2">
                <Button
                  type="success"
                  id="likeBtn"
                  onClick={() => {
                    this.handleLike();
                  }}
                  alt="Like case"
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
                  alt="Dislike case"
                >
                  {this.dislikes} <i className="fas fa-thumbs-down" />
                </Button>
              </div>
            </div>

            <h4 className="card-title" alt="Sakens overksrift">{this.props.case.overskrift}</h4>
            <h5 className="card-text" alt="Sakens bildetekst">{this.props.case.bildetekst}</h5>
            <hr/>
            <div dangerouslySetInnerHTML={{__html: this.props.case.innhold}}></div>

            <a
              className="d-flex justify-content-end"
              href="/#/"
              data-toggle="collapse"
              data-target="#admin"
              aria-expanded="false"
              aria-controls="admin"
            >
              <i className="admin fas fa-cog fa-2x" />
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default Card;
/*<p className="card-text" alt="Sakens innhold">{this.props.case.innhold}</p>*/