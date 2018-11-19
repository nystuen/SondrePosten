// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import Card from '../../card/card';
import { TextHeader } from '../../textHeader/textHeader';
import { caseService } from '../../../services';
import { Alert } from '../../../widgets';
import css from './category.css';
import { CardPreview } from '../../card/cardPreview';
import { CaseFeed } from '../../caseFeed/caseFeed';
import {CaseObject} from '../../types/types';

export class Category extends Component<{ match: { params: { kat: string } } }> {
  cases: CaseObject[] = [];
  amountOfCases: number = -1;

  componentDidMount() {
    caseService
      .getAllFromOneKat(this.props.match.params.kat)
      // $FlowFixMe
      .then(cases => (this.cases = cases.data))
      .then(cases => this.amountOfCases = cases.length)
      .catch((error: Error) => Alert.danger(error.message));
  }

  render() {
    return (
      <div>
        <CaseFeed title={this.props.match.params.kat.toUpperCase()} cases={this.cases}/>
      </div>
    );
  }
}
