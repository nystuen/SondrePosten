
import {Component} from "react-simplified";
import * as React from 'react';
import {NavLink} from "react-router-dom";
import Button from "../button/button";

export class Card extends Component<{
    case: JSON,
    noButton ?: boolean
}> {
    render() {
        return (
            <div className="card" styles="width: 18rem;">
                <img className="card-img-top" src={this.props.case.bilde} alt="Card image cap"/>
                <div className="card-body">
                    <h5 className="card-title">{this.props.case.overskrift}</h5>
                    <p className="card-text">{this.props.case.innhold}</p>
                    <NavLink classname="btn btn-light" to={`/case/${this.props.case.id}`}>
                        {
                            this.props.noButton ? (
                                null
                            ) : (
                            <a href="" className="btn btn-light">Les mer om denne saken</a>
                            )
                        }
                    </NavLink>
                </div>
            </div>
        );

    }
}

export default Card;
