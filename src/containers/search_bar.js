import React, { Component } from 'react';
import CityInput from './city_input';
import LocalityInput from './locality_input';
import KeywordInput from '../components/keyword_input';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchAllDailyMenus } from '../actions/fetch_menus';

class SearchBar extends Component {

  constructor() {
    super();

    this.state = {
      keyword: ''
    }

    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  canBeSubmitted() {
    const { keyword, locality_id } = this.state;
    return (
      keyword.length > 3 &&
      locality_id.length > 0
    );
  }

  onFormSubmit = (event) => {
    event.preventDefault();
    if (!this.canBeSubmitted()) {
      return;
    }
    const { keyword, locality_id } = this.state;
    this.props.fetchAllDailyMenus(locality_id, keyword);
  };

  keywordOnChange = (keyword) => {
    this.setState({ keyword });
  };

  localityOnChange = (locality_id) => {
    this.setState({ locality_id });
  }

  render() {
    const isEnabled = this.canBeSubmitted();

    return (
      <form onSubmit={this.onFormSubmit} className="form-inline row">
        <div className="col-sm-3">
          <CityInput />
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchAllDailyMenus }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
