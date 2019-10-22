import * as React from 'react';

export class Row extends React.Component{
  render() {
    return (
      <div className="row">
        {this.props.children}
      </div>
    );
  }
}
