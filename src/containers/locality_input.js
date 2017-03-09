import React, { Component } from 'react';
import { connect } from 'react-redux';

class LocalityInput extends Component {

  renderOption = (data) => {
    return (
      <option value={data.subzone.subzone_id} key={data.subzone.subzone_id}>{data.subzone.name}</option>
    );
  };

  handleChange = (event) => {
    this.props.callback(event.target.value);
  };

  render(){
    return (
      <div className="form-group">
        <select className="form-control" name="locality" defaultValue="Select locality" onChange={this.handleChange}>
          <option disabled>Select locality</option>
          {this.props.localities.map(this.renderOption)}
        </select>
      </div>
    );
  }
}

function mapStateToProps({ localities }) {
  return { localities };
}

export default connect(mapStateToProps)(LocalityInput);
