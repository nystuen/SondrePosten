// @flow{setTimeout( this.alerts.splice(i, 1),5000)}{setTimeout( this.alerts.splice(i, 1),5000)}

import { Component } from 'react-simplified';
import { NavLink } from 'react-router-dom';
import * as React from 'react';
import css from './header.css';
import { caseService } from '../../services';
import { Alert } from '../alerts/alerts';
import Card from '../card/card';
import { CaseObject } from '../types/types';
//import {CaseType} from '../types/caseType';
import Marquee from 'react-smooth-marquee';

export class LiveFeed extends Component {
  cases: CaseObject[] = [];
  componentDidMount() {
    this.getCases();

    // oppdater livefeed hvert tiende sekund
    setInterval(this.getCases, 10000);
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
      <div className="liveFeed sticky-top">
        <marquee truespeed="true" scrolldelay="50">
          <div className="marqueeContent">
            {this.cases.map(thisCase => (
              // $FlowFixMe
              <NavLink key={thisCase.id} exact to={'/sak/' + thisCase.id}>
                <span>
                  {thisCase.overskrift} ({thisCase.tidspunkt})
                </span>
              </NavLink>
            ))}
          </div>
        </marquee>
      </div>
    );
  }
}
