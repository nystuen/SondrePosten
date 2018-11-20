// @flow

import { Component } from 'react-simplified';
import * as React from 'react';
import Card from '../card/card';

/**
 * Button
 */

export class Button extends Component<{ type: string, href?: string, onClick: () => mixed, children: React.Node }> {
  className: string = 'btn btn-' + this.props.type;

  render() {
    return (
      <span>
        <button id="button" onClick={() => null} className={this.className}>
          {this.props.children}
        </button>
      </span>
    );
  }
}

export default Button;

export class InputField extends Component<{ labelName: string, type: string, id: string, defaultValue: string }> {
  render() {
    return (
      <div className="form-group">
        <label htmlFor="exampleFormControlTextarea1">{this.props.labelName}</label>
        <input
          type={this.props.type}
          id={this.props.id}
          className="form-control"
          defaultValue={this.props.defaultValue}
          disabled
        />
      </div>
    );
  }
}
