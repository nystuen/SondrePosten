import * as React from 'react';
import {Component} from "react-simplified";
import './textHeader.css';


export class TextHeader extends Component<{ text : string }> {

    render() {
        return (
            <div className="container textheader ">
                <h3>{this.props.text}</h3>
            </div>
        );
    }
}
