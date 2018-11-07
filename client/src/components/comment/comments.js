import * as React from 'react';
import {Component} from 'react-simplified';
import Card from '../card/card';
import {Alert} from "../../widgets";
import {caseService} from '../../services';
import {TextHeader} from "../textHeader/textHeader";

export class Comments extends Component<{ id: number }> {
    comments = [];

    componentDidMount() {
        caseService
            .getComments(this.props.id)
            .then(comments => (this.comments = comments.data))
            .catch((error: Error) => Alert.danger(error.message));
    }

    render() {
        return (
            <div className="comments">
                {this.comments.map(thisComment => (
                    <div className="singleComment">
                        <h3>{thisComment.brukernavn}</h3>
                        <p>{thisComment.kommentar}</p>
                    </div>
                ))}
            </div>
        );
    }
}
