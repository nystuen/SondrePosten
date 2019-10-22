//@flow

import * as React from 'react';
import { Component } from 'react-simplified';
import Card from '../card/card';
import { TextHeader } from '../textHeader/textHeader';
import { caseService } from '../../services';
import { Alert } from '../alerts/alerts';
import { CardPreview } from '../card/cardPreview';
import { CaseFeed } from '../../pages/caseFeed/caseFeed';
import { CaseObject } from '../types/types';

export class ImportantCases extends Component {
  cases: CaseObject[] = [];

  componentDidMount() {
    caseService
      .getHeadersAndPicturesFromImportantCases()
      // $FlowFixMe
      .then(cases => (this.cases = cases.data))
      .catch((error: Error) => Alert.danger(error.message));
  }

  render() {
    return (
      <div>
        <CaseFeed title="Viktige saker" cases={this.cases} />
      </div>
    );
  }
}
