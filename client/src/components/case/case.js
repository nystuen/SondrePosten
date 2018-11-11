// @flow
import * as React from 'react';
import { Component } from 'react-simplified';
import Card from '../card/card';
import { Alert } from '../../widgets';
import { caseService } from '../../services';
import { AddComment } from '../comment/addComment';
import { Comments } from '../comment/comments';
import { Button } from '../button/button';
import css from './case.css';
import { CaseType } from '../types/caseType';

export class Case extends Component<{ match: { params: { id: number } } }> {
  cases: CaseType[] = [];
  id = this.props.match.params.id;

  componentDidMount() {
    caseService
      .getCase((this.props.match.params.id))
      // $FlowFixMe
      .then(cases => (this.cases = cases.data))
      .then(console.log(this.cases))
      .catch((error: Error) => Alert.danger(error.message));
  }

  render() {
    return (
      <div className="container-large feed">
        {this.cases.map(s => (
          <Card key={s.id} case={s}/>
        ))}
        <AddComment id={this.props.match.params.id}/>
        <Comments id={this.props.match.params.id}/>
        <Button type="danger" onClick={() => { this.slettSak(this.props.match.params.id) }} href={''}>Slett denne saken</Button>
      </div>
    );
  }

  slettSak = function(id: number) {
    if (confirm('Er du sikker på at du ønsker å slette denne saken?')) {
      caseService
        .deleteOneCase(id)
        .then(Alert.success('Sak slettet.'))
        .catch((error: Error) => Alert.danger(error.message));
    } else {
      Alert.danger('Sak ble ikke slettet allikevel.');
    }
  };


}
