import React, { Component } from 'react';
import { connect } from 'react-redux';

class LocalityInput extends Component {

  componentDidUpdate(prevProps) {
    if(prevProps.localities.length == 0 && this.props.localities.length > 0) {
      this.props.callback(this.props.localities[0].subzone.subzone_id.toString());
    }
  }

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
        <select className="form-control" name="locality" onChange={this.handleChange}>
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
