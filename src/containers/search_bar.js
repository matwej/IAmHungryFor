import React, { Component } from 'react';
import CityInput from './city_input';
import LocalityInput from './locality_input';
import KeywordInput from '../components/keyword_input';

export default class SearchBar extends Component {

  constructor() {
    super();

    this.state = {
      keyword: ''
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  canBeSubmitted() {
    const { keyword, city_id, locality_id } = this.state;
    return (
      keyword.length > 3 &&
      city_id.length > 0 &&
      locality_id.length > 0
    );
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    if (!this.canBeSubmitted()) {
      return;
    }
    console.log(this.state.keyword);
    console.log(this.state.locality_id);
    console.log(this.state.city_id);
  };

  keywordOnChange = (keyword) => {
    this.setState({ keyword });
  };

  localityOnChange = (locality_id) => {
    this.setState({ locality_id });
  }

  cityOnChange = (city_id) => {
    this.setState({ city_id });
  }

  render() {
    const isEnabled = this.canBeSubmitted();

    return (
      <form onSubmit={this.onFormSubmit} className="form-inline row">
        <div className="col-sm-3">
          <CityInput callback={this.cityOnChange} />
        </div>
        <div className="col-sm-3">
          <LocalityInput localities={[]} callback={this.localityOnChange} />
        </div>
        <div className="col-sm-3">
          <KeywordInput value={this.state.keyword} callback={this.keywordOnChange}/>
        </div>
        <div className="col-sm-3">
          <button type="submit" className="btn btn-primary" disabled={!isEnabled}>Search</button>
        </div>
      </form>
    );
  }
}
