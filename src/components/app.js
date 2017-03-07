import React, { Component } from 'react';
import CityInput from '../containers/city_input';
import LocalityInput from '../containers/locality_input';
import KeywordInput from './keyword_input';

export default class App extends Component {
  render() {
    return (
      <form className="form-inline">
        <CityInput />
        <LocalityInput localities={[]} />
        <KeywordInput />
        <button type="submit" className="btn btn-primary">Search</button>
      </form>
    );
  }
}
