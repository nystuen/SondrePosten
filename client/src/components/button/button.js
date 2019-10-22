// @flow

import { Component } from 'react-simplified';
import * as React from 'react';
import Card from '../card/card';

/**
 * Button
 */

export class Button extends Component<{ type: string, href?: string, id?: string, onClick: () => mixed, children: React.Node }> {
  className: string = 'btn btn-' + this.props.type;

  getButtonId(){
    if(this.props.id){
      return this.props.id;
    } else {
      return "button"
    }
  }


  render() {
    return (
      <span id={this.getButtonId()}>
        <button
          id={this.getButtonId()}
          onClick={() => {
            this.props.onClick();
          }}
          className={this.className}

          alt="En gjenbrukbar knapp"
        >
          {this.props.children}
        </button>
      </span>
    );
  }
}

export default Button;
