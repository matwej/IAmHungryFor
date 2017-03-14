import React, { Component } from 'react';
import SearchBar from '../containers/search_bar';
import ResultsList from '../containers/results_list';

export default class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row vert-offset-top-4">
          <div className="col-lg-12">
            <SearchBar />
          </div>
        </div>
        <div className="row vert-offset-top-4">
          <div className="col-lg-12">
            <ResultsList />
          </div>
        </div>
      </div>
    );
  }
}
