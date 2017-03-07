import React, { Component } from 'react';
import { connect } from 'react-redux';

class LocalityInput extends Component {

  renderOption(data) {
    return (
      <option value={data.subzone.subzone_id} key={data.subzone.subzone_id}>{data.subzone.name}</option>
    );
  }

  render(){
    return (
      <div className="form-group">
        <label htmlFor="select_locality">Locality: </label>
        <select className="form-control" id="select_locality">
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
