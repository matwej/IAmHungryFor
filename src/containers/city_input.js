import Autosuggest from 'react-autosuggest';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchCities, fetchLocalities } from '../actions/index';

// When suggestion is clicked, Autosuggest needs to populate the input element
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.name;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <a href="#">{suggestion.name}, {suggestion.country_name}</a>
);

const theme = {
  container: 'autosuggest',
  input: 'form-control',
  suggestionsContainer: 'dropdown open',
  suggestionsList: 'dropdown-menu',
  suggestion: '',
  suggestionFocused: 'active',
};

class CityInput extends Component {
  constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };
    this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
    this.onSuggestionSelected = this.onSuggestionSelected.bind(this);
  }

  onChange = (event, { newValue }) => {
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    if(value.length >= 4) {
      this.props.fetchCities(value);
    }
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  onSuggestionSelected = (event, { suggestion }) => {
    const suggestion_id = suggestion.id.toString();
    this.props.fetchLocalities(suggestion_id);
  };

  render() {
    // Autosuggest will pass through all these props to the input element.
    const inputProps = {
      placeholder: 'Type a city',
      value: this.state.value,
      required: 'required',
      onChange: this.onChange
    };

    // Finally, render it!
    return (
      <div className="form-group">
        <Autosuggest
          id="city_autocomplete"
          suggestions={this.props.cities}
          onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.onSuggestionsClearRequested}
          onSuggestionSelected={this.onSuggestionSelected}
          getSuggestionValue={getSuggestionValue}
          renderSuggestion={renderSuggestion}
          inputProps={inputProps}
          theme={theme}
        />
      </div>
    );
  }
};

function mapStateToProps({ cities }) {
  return { cities };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCities, fetchLocalities }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CityInput);
