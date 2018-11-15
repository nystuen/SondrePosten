import {Component} from "react-simplified";
import * as React from 'react';
import {NavLink} from "react-router-dom";
import Button from "../button/button";
import { CaseObject } from '../types/types';

export class CardPreview extends Component<{
  case: CaseObject
}> {
    render() {
        return (
            <div className="case card" styles="width: 18rem;">
                <img className="card-img-top" src={this.props.case.bilde} alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.case.overskrift}</h5>
                    <NavLink key={this.props.case.id} className="btn btn-light" to={`/sak/${this.props.case.id}`}>Les mer om denne saken</NavLink>
                </div>
            </div>
        );

    }
}

