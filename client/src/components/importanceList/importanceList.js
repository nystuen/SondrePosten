//@flow
import * as React from 'react';
import { Component } from 'react-simplified';
import { Col } from 'react-bootstrap';

export default class ImportanceList extends React.Component<{viktighet?: number}> {

  // $FlowFixMe
  constructor(props) {
    super(props);

    (this: any).handleChange = this.handleChange.bind(this);
  }

  handleChange(e: Object) {
    console.log("New viktighet: " + e.target.value);
    // $FlowFixMe
    this.props.onChange(e.target.value);
  };


  render() {
    return (
      <div>
        <select
        className="form-control"
        id="viktighet"
        name="viktighet"
        onChange={(e) => this.handleChange(e)}
        >
          <option value="">Velg viktighet</option>
          <option value={1}>Viktig</option>
          <option value={2}>Ikke like viktig</option>
        </select>
      </div>
    );
  }
}
