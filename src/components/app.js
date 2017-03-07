import React, { Component } from 'react';
import CityInput from '../containers/city_input';

export default class App extends Component {
  render() {
    return (
      <form className="form-inline">
        <div className="form-group">
          <CityInput />
        </div>
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
    );
  }
}
