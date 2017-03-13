import React, { Component } from 'react';
import SearchBar from '../containers/search_bar';
import ResultsList from '../containers/results_list';

export default class App extends Component {
  render() {
    return (
      <div>
        <SearchBar />
        <ResultsList />
      </div>
    );
  }
}
