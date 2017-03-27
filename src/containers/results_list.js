import React, { Component } from 'react';
import { connect } from 'react-redux';

class ResultsList extends Component {

  getGmapsUrl = (restaurant) => {
    return `https://www.google.com/maps/preview/@${restaurant.location.latitude},${restaurant.location.longitude},19z`;
  };

  renderItem = (data) => {
    return (
      <div className="alert alert-info row" key={data.dish.dish_id}>
        <div className="col-sm-9">
          <h4>{data.dish.name}</h4>
          <strong>
            {data.restaurant.name},{data.restaurant.location.address}&nbsp;
            <small>(
              <a href={data.restaurant.url} target="_blank"><i className="glyphicon glyphicon-new-window"></i>open in Zomato</a>&nbsp;
              <a href={this.getGmapsUrl(data.restaurant)} target="_blank"><i className="glyphicon glyphicon-pushpin"></i>open in GMaps</a>
            )</small>
          </strong>
        </div>
        <div className="col-sm-3 text-right">
          <h4>Price: {data.dish.price.length ? data.dish.price : '-'}</h4>
        </div>
      </div>
    );
  };

  render() {
    if(this.props.menus.length) {
      return (
        <div>
          {this.props.menus.map(this.renderItem)}
        </div>
      );
    } else if (this.props.loader) {
      return (
        <div className="text-center">
          <h1 className="glyphicon glyphicon-refresh right-spinner"></h1>
        </div>
      );
    } else {
      return <div className="clearfix"></div>;
    }
  }
}

function mapStateToProps({ menus }) {
  return { menus: menus.list, loader: menus.loader };
}

export default connect(mapStateToProps)(ResultsList);
