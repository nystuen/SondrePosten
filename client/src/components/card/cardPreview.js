import {Component} from "react-simplified";
import * as React from 'react';
import {NavLink} from "react-router-dom";
import Button from "../button/button";

export class CardPreview extends Component<{
    case: JSON
}> {
    render() {
        return (
            <div className="case card" styles="width: 18rem;">
                <img className="card-img-top" src={this.props.case.bilde} alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.case.overskrift}</h5>
                    <NavLink className="btn btn-light" to={`/case/${this.props.case.id}`}>
                        <a key={this.props.case.id} href="" className="btn btn-light">Les mer om denne saken</a>
                    </NavLink>
                </div>
            </div>
        );

    }
}

