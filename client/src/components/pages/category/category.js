import * as React from 'react';
import { Component } from 'react-simplified';
import Card from '../../card/card';
import { TextHeader } from '../../textHeader/textHeader';
import { caseService } from '../../../services';
import { Alert } from '../../../widgets';
import css from './category.css';
import { CardPreview } from '../../card/cardPreview';

export class Category extends Component<{ match: { params: { kat: string } } }> {
  cases = [];
  amountOfCases: number = -1;


  componentDidMount() {
    caseService
      .getAllFromOneKat(this.props.match.params.kat)
      .then(cases => (this.cases = cases.data))
      .then(cases => this.amountOfCases = cases.length)
      .catch((error: Error) => Alert.danger(error.message));
  }

  render() {
    return (
      <div>
        <TextHeader text={this.props.match.params.kat.toUpperCase()}/>

        <div className="container-large grid">
          {this.cases.map(s => (
            <CardPreview key={s.id} case={s}/>
          ))}
        </div>

        <p>Antall saker: {this.amountOfCases}</p>
      </div>
    );
  }
}
