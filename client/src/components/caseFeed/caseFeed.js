// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert } from '../../widgets';
import { caseService } from '../../services';
import { TextHeader } from '../textHeader/textHeader';
import css from './caseFeed.css';
import { CardPreview } from '../card/cardPreview';
import { Button } from '../button/button';
import { CaseType } from '../types/caseType';

export class CaseFeed extends Component<{ title: string, cases: CaseType[] }> {
  amountOfCases = 5;

  render() {
    return (
      <div>
        <TextHeader text={this.props.title}/>
        <div className="grid container-large">

          {this.props.cases.slice(0, this.amountOfCases).map(thisCase => (
            <CardPreview key={thisCase.id} case={thisCase}/>
          ))}

        </div>
        <div className="container-large amountOfCases">
          <p>Viser {this.props.cases.slice(0, this.amountOfCases).length} av {this.props.cases.length}</p>

          <Button id="loadMoreButton" type="success" onClick={() => {
            this.loadMore();
          }} href={''}>Last inn flere saker</Button>
        </div>
      </div>
    );
  }

  loadMore() {
    this.amountOfCases += 5;
  }
}

