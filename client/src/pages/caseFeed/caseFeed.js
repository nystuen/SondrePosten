// @flow

import * as React from 'react';
import { Component } from 'react-simplified';
import { TextHeader } from '../../components/textHeader/textHeader';
import { CardPreview } from '../../components/card/cardPreview';
import { Button } from '../../components/button/button';
import { CaseObject } from '../../components/types/types';

export class CaseFeed extends Component<{ title: string, cases: CaseObject[] }> {
  amountOfCases: number = 6;

  render() {
    return (
      <div className="caseFeed">
        <TextHeader text={this.props.title} />
        <div className="grid container-large">
          {this.props.cases.slice(0, this.amountOfCases).map(thisCase => (
            <CardPreview alt="En sak" key={thisCase.id} case={thisCase} />
          ))}
        </div>

        <div className="container-large amountOfCases">
          <p alt="Antall saker som vises">
            Viser {this.props.cases.slice(0, this.amountOfCases).length} av {this.props.cases.length}
          </p>

          {this.amountOfCases < this.props.cases.length ? (
            <Button
              id="loadMoreButton"
              type="success"
              onClick={() => {
                this.loadMore();
              }}
              href={''}
              alt="Last inn flere saker"
            >
              Last inn flere saker
            </Button>
          ) : null}
        </div>
      </div>
    );
  }

  loadMore() {
    this.amountOfCases += 6;
  }
}
