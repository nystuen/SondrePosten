import * as React from 'react';
import {Component} from 'react-simplified';
import {Alert} from "../../widgets";
import {caseService} from '../../services';
import {TextHeader} from "../textHeader/textHeader";
import css from './caseFeed.css';
import {CardPreview} from "../card/cardPreview";

export class CaseFeed extends Component {
    cases = [];

    componentDidMount() {
        caseService
            .getHeadersAndPicturesFromImportantCases()
            .then(cases => (this.cases = cases.data))
            .catch((error: Error) => Alert.danger(error.message));
    }

    render() {
        return (
            <div>
                <TextHeader text="Viktige saker"/>
                <div className="grid container-large">
                    {this.cases.map(thisCase => (
                        <CardPreview key={thisCase.id} case={thisCase}/>
                    ))}
                </div>
            </div>
        );
    }
}
