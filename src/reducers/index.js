import { combineReducers } from 'redux';
import CitiesReducer from './reducer_cities';

const rootReducer = combineReducers({
  cities: CitiesReducer
});

export default rootReducer;
