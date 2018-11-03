import * as React from 'react';
import { Component } from 'react-simplified';
import Card from '../card/card';
import {Alert} from "../../widgets";
import { caseService} from '../../services';

export class Case extends Component<{ match: { params: { id: number } } }> {
    cases = [];
    componentDidMount() {
        caseService
            .getCase((this.props.match.params.id))
            .then(cases => (this.cases = cases.data))
            .then(console.log(this.cases))
            .catch((error: Error) => Alert.danger(error.message));
    }

  render() {
    return (
      <div className="container feed">
        {this.cases.map(s => (
          <div className="container feed">
            <Card case={s} noButton={true}/>
          </div>
        ))}
      </div>
    );
  }

}
