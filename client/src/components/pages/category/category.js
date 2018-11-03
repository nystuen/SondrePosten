import * as React from 'react';
import {Component} from 'react-simplified';
import Card from '../../card/card';
import {TextHeader} from "../../textHeader/textHeader";
import {caseService} from '../../../services';
import {Alert} from "../../../widgets";

export class Category extends Component<{ match: { params: { cat: string } } }> {
    cases = [];


    componentDidMount() {
        caseService
            .getAllFromOneKat(this.props.match.params.cat)
            .then(cases => (this.cases = cases.data))
            .then(console.log(this.cases))
            .catch((error: Error) => Alert.danger(error.message));
    }

    render() {
        return (
            <div>
                <TextHeader text={this.props.match.params.cat.toLocaleUpperCase()}/>
                <div className="container grid">
                    {this.cases.map(s => (
                        <Card case={s}/>
                    ))}
                </div>
            </div>
        );
    }
}
