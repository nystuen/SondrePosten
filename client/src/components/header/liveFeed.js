// @flow

import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import * as React from 'react';
import css from './header.css';
import { caseService } from '../../services';
import { Alert } from '../../widgets';
import Card from '../card/card';
import { CaseObject } from '../types/types';
//import {CaseType} from '../types/caseType';
import Marquee from 'react-smooth-marquee';

export class LiveFeed extends Component {
  cases: CaseObject[] = [];

  componentDidMount() {
    this.getCases();

    // oppdater livefeed hvert tiende sekund
    setInterval(this.getCases, 60000);
  }

  getCases = () => {
    caseService
      .getNewestCasesForLiveFeed()
      // $FlowFixMe
      .then(cases => (this.cases = cases.data))
      .catch((error: Error) => Alert.danger(error.message));
  };

  render() {
    return (
      <div className="liveFeed sticky-top" behavior="alternate" scrollamount="1">
        <marquee>
          <div className="marqueeContent">
            {this.cases.map(thisCase => (
              <span key={thisCase.id}>{thisCase.overskrift} ({thisCase.tidspunkt})</span>
            ))}
          </div>
        </marquee>
      </div>
    );
  }
}
