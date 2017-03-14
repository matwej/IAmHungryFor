import { CONFIG, ROOT_URL } from './index';
import axios from 'axios';

export const CLEAR_MENUS = 'CLEAR_MENUS';
export const LIST_MENUS = 'LIST_MENUS';

export function listMenus(restaurants, menus) {
  return {
    type: LIST_MENUS,
    restaurants,
    menus
  }
}

export function clearMenus() {
  return {type: CLEAR_MENUS}
}

function fetchRestaurantMenus(restaurant) {
  const url = `${ROOT_URL}/dailymenu?res_id=${restaurant.id}`;
  return axios.get(url, CONFIG);
}

function handleRestaurants(restaurantResponses) {
  return (dispatch) => {
    const restaurants = [].concat.apply([], restaurantResponses.map((item) => {return item.data.restaurants}));
    var menuPromises = [];
    for (var i = 0, len = 24; i < len; i++) { // restaurants.length
      menuPromises.push(fetchRestaurantMenus(restaurants[i].restaurant));
    }
    return axios.all(menuPromises).then((responses) => dispatch(listMenus(restaurants, responses)));
  };
}

function handleSearchResponse(response, url) {
  return (dispatch) => {
    const found = response.data.results_found;
    const shown = response.data.results_shown;
    if(found > shown) {
      var more_restaurants = [];
      for(let i=found-shown;i>0;i-=shown) {
        more_restaurants.push(axios.get(`${url}&start=${found-i}`, CONFIG));
      }
      return axios.all(more_restaurants).then( (responses) => dispatch(handleRestaurants(responses.concat([response]))) );
    } else {
      return dispatch(handleRestaurants([response]));
    }
  };
}

export function fetchAllDailyMenus(locality_id, keyword) {
  const url = `${ROOT_URL}/search?entity_type=subzone&entity_id=${locality_id}`;
  return (dispatch) => {
    dispatch(clearMenus());
    return axios.get(
      url, CONFIG
    ).then( (response) => dispatch(handleSearchResponse(response, url)) );
  };
}
