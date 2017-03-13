import { combineReducers } from 'redux';
import CitiesReducer from './reducer_cities';
import LocalitiesReducer from './reducer_localities';
import MenusReducer from './reducer_menus';

const rootReducer = combineReducers({
  cities: CitiesReducer,
  localities: LocalitiesReducer,
  menus: MenusReducer
});

export default rootReducer;
