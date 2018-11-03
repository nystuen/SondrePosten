import {Component} from "react-simplified";
import * as React from 'react';
import Card from "../card/card";

/**
 * Button
 */

export class Button extends Component<{ type: string, href: string, onClick: () => mixed, children: React.Node }> {
    className = 'btn btn-' + this.props.type;

    render() {
        return (
            <div>
                <button className={this.className}>{this.props.children}</button>
            </div>
        );
    }
}

export default Button;