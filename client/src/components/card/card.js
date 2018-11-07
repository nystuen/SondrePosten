import {Component} from "react-simplified";
import * as React from 'react';
import {NavLink} from "react-router-dom";
import Button from "../button/button";
import css from './card.css';

export class Card extends Component<{
    case: JSON,
}> {
    render() {
        return (
            <div>
                <div className="card" styles="width: 18rem;">
                    <img className="card-img-top" src={this.props.case.bilde} alt="Card image cap"/>
                    <div className="card-body">
                        <p>Lansert: {this.props.case.tidspunkt}</p>
                        <h4 className="card-title">{this.props.case.overskrift}</h4>
                        <h5 className="card-text">{this.props.case.bildetekst}</h5>
                        <hr/>
                        <p className="card-text">{this.props.case.innhold}</p>
                    </div>
                </div>
            </div>
        );

    }
}

export default Card;
