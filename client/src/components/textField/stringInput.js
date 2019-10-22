import * as React from 'react';

export default class StringInput extends React.Component<{
  title: string,
  id: string,
  name: string,
  value?: string,
  defaultValue?: string,
  textArea?: boolean
}>{
  constructor(props) {
    super(props);

    this.state = {
      text : ""
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e: Object) {
    this.props.onChange(e.target.value);
  };

  render() {
    const textArea = this.props.textArea;
    return (

      <div className="input-group input-group-mb mb-3">
        <div className="input-group-prepend">
            <span className="input-group-text" id="basic-addon1">
              {this.props.title}
            </span>
        </div>

        {textArea ? (
          <textarea
            type="text"
            className="form-control"
            placeholder=""
            aria-label={this.props.title}
            aria-describedby="basic-addon1"
            rows="5"
            id={this.props.id}
            name={this.props.name}
            defaultValue={this.props.defaultValue}
            onChange={(e) => this.handleChange(e)}
          />
        ) : (
          <input
            type="text"
            className="form-control"
            placeholder=""
            aria-label={this.props.title}
            aria-describedby="basic-addon1"
            id={this.props.id}
            name={this.props.name}
            defaultValue={this.props.defaultValue}
            onChange={(e) => this.handleChange(e)}
          />
        )}
      </div>
    );
  }
}