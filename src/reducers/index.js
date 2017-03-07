import { combineReducers } from 'redux';
import CitiesReducer from './reducer_cities';
import LocalitiesReducer from './reducer_localities';

const rootReducer = combineReducers({
  cities: CitiesReducer,
  localities: LocalitiesReducer
});

export default rootReducer;
