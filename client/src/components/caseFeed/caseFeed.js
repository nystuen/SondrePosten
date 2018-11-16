// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { Alert } from '../../widgets';
import { caseService } from '../../services';
import { TextHeader } from '../textHeader/textHeader';
import css from './caseFeed.css';
import { CardPreview } from '../card/cardPreview';
import { Button } from '../button/button';
import { CaseObject } from '../types/types';

export class CaseFeed extends Component<{ title: string, cases: CaseObject[] }> {
  amountOfCases: number = 10;

  render() {
    return (
      <div className="caseFeed">

        <TextHeader text={this.props.title}/>
        <div className="grid container-large">

          {this.props.cases.slice(0, this.amountOfCases).map(thisCase => (
            <CardPreview key={thisCase.id} case={thisCase}/>
          ))}
        </div>

        <div className="container-large amountOfCases">
          <p>Viser {this.props.cases.slice(0, this.amountOfCases).length} av {this.props.cases.length}</p>

          {(this.amountOfCases === this.props.cases.slice(0, this.amountOfCases).length) ? (

            <Button id="loadMoreButton" type="success" onClick={() => {
              this.loadMore();
            }} href={''}>Last inn flere saker</Button>
          ) : (null)}
        </div>
      </div>
    );
  }

  loadMore() {
    console.log('current cases: ' + this.amountOfCases);
    this.amountOfCases += 10;
    console.log('cases now: ' + this.amountOfCases);
  }
}

