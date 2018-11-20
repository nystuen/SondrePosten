// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import Card from '../card/card';
import { Alert } from '../alerts/alerts';
import { caseService } from '../../services';
import { Comments } from '../comment/comments';
import { Button } from '../button/button';
import css from './case.css';
import { CaseObject } from '../types/types';
import { NavLink } from 'react-router-dom';
import { history } from '../../index';

export class Case extends Component<{ match: { params: { id: number } } }> {
  cases: CaseObject[] = [];
  id = this.props.match.params.id;

  componentDidMount() {
    caseService
      .getCase(this.props.match.params.id)
      // $FlowFixMe
      .then(cases => (this.cases = cases.data))
      .catch((error: Error) => Alert.danger(error.message));
  }

  render() {
    return (
      <div className="container-large feed">
        <div className="case">
          {this.cases.map(s => (
            <Card key={s.id} case={s} />
          ))}
        </div>

        {/* Collapsable admin panel, opens by cog-wheel in card.js */}
        <div className="collapse" id="admin">
          <Button
            id="deleteCase"
            type="danger"
            onClick={() => {
              this.slettSak(this.props.match.params.id);
            }}
            href={''}
            alt="Slett sak"
          >
            Slett denne saken
          </Button>
          <NavLink className="btn btn-danger" to={'/endre/' + this.props.match.params.id} alt="Endre sak">
            Endre sak
          </NavLink>
        </div>

        <Comments id={this.props.match.params.id} />
      </div>
    );
  }

  slettSak = function(id: number) {
    if (confirm('Er du sikker på at du ønsker å slette denne saken?')) {
      caseService
        .deleteOneCase(id)
        .then(Alert.success('Sak slettet.'))
        .then(history.push('/'))
        .catch((error: Error) => Alert.danger(error.message));
    } else {
      Alert.danger('Sak ble ikke slettet allikevel.');
    }
  };
}
