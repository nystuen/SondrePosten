import * as React from 'react';
import {Component} from 'react-simplified';
import Card from '../../card/card';
import {TextHeader} from "../../textHeader/textHeader";
import {caseService} from '../../../services';
import {Alert} from "../../../widgets";
import css from './category.css';
import {CardPreview} from "../../card/cardPreview";

export class Category extends Component<{ match: { params: { kat: string } } }> {
    cases = [];


    componentDidMount() {
        caseService
            .getAllFromOneKat(this.props.match.params.kat)
            .then(cases => (this.cases = cases.data))
            .then(console.log(this.cases))
            .catch((error: Error) => Alert.danger(error.message));
    }

    render() {
        return (
            <div>
                <TextHeader text={this.props.match.params.kat.toLocaleUpperCase()}/>
                <div className="container-large grid">
                    {this.cases.map(s => (
                        <CardPreview case={s}/>
                    ))}
                </div>
            </div>
        );
    }
}
