// @flow

import {Component} from "react-simplified";
import * as React from 'react';
import {TextHeader} from "../textHeader/textHeader";
import Button from "../button/button";
import css from './comment.css';
import {caseService} from "../../services";
import { history } from "../../index";


export class AddComment extends Component<{ id: number }> {
    comment = null;

    handleSubmit = event => {
        let newComment = {
            'sak_id': this.props.id,
            'brukernavn':  document.getElementById("brukernavnInput").value,
            'kommentar': document.getElementById("kommentarInput").value
        };

        caseService.addComment(newComment)
            .then(res => {
               console.log(res);
               console.log(res.data);
               history.push('/case/' + this.props.id);
               this.comment = newComment;
            });

    };

    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <div className=" detailBox form-group">
                    <div className="card">
                        <div className="card-header"><h4>Legg til en kommentar</h4></div>
                        <div className="card-block">
                            <input placeholder="Brukernavn" type="text" className="form-control"
                                   id="brukernavnInput"></input>
                        </div>
                        <div className="card-block">
                            <textarea placeholder="Kommentar" className="form-control" rows="5"
                                      id="kommentarInput"></textarea>
                            <button type="submit" className="btn btn-light">Legg ut kommentar</button>
                        </div>
                    </div>
                </div>
            </form>
        );
    }
}