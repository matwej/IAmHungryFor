import React, { Component } from 'react';

export default class KeywordInput extends Component {

  handleChange = (event) => {
    this.props.callback(event.target.value);
  };

  render() {
    return (
      <div className="form-group">
        <input
          type="text"
          className="form-control"
          name="keyword"
          placeholder="Keyword (min 4 chars)"
          required="required"
          value={this.props.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}
