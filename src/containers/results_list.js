import React, { Component } from 'react';
import { connect } from 'react-redux';

class ResultsList extends Component {

  renderItem = (data) => {
    return (
      <li key={data.id}>menu_id: {data.id}, meno: {data.rname}</li>
    );
  }

  render() {
    return (
      <div>
        <ul>
          {this.props.menus.map(this.renderItem)}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ menus }) {
  return { menus };
}

export default connect(mapStateToProps)(ResultsList);
