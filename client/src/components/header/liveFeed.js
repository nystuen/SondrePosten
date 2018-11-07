// @flow

import {Component} from 'react-simplified';
import {NavLink} from 'react-router-dom';
import * as React from 'react';
import css from './header.css';
import {caseService} from "../../services";
import {Alert} from "../../widgets";
import Card from "../card/card";


export class LiveFeed extends Component {
    cases = [];

    componentDidMount() {
        this.getCases();

        // oppdater livefeed hvert tiende sekund
        setInterval(this.getCases, 10000,);
    }

    getCases = () => {
        caseService
            .getNewestCasesForLiveFeed()
            .then(cases => (this.cases = cases.data))
            .catch((error: Error) => Alert.danger(error.message));
    };

    render() {
        return (
            <div className="liveFeed" behavior="alternate" scrollamount="7">
                <marquee>
                    <span>-</span>
                    {this.cases.map(thisCase => (
                        <span key={thisCase.id}>{thisCase.overskrift} ({thisCase.tidspunkt}) -</span>
                    ))}
                </marquee>
            </div>
        );
    }
}
