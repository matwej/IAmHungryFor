import { CONFIG, ROOT_URL } from './index';
import axios from 'axios';

export const CLEAR_MENUS = 'CLEAR_MENUS';
export const LIST_MENUS = 'LIST_MENUS';

export function listFilteredMenus(restaurants, menus, keyword) {
  return {
    type: LIST_MENUS,
    restaurants,
    menus,
    keyword
  }
}

export function clearMenus() {
  return {type: CLEAR_MENUS}
}

function fetchRestaurantMenus(restaurant) {
  const url = `${ROOT_URL}/dailymenu?res_id=${restaurant.id}`;
  return axios.get(url, CONFIG);
}

function processRestaurants(restaurantResponses, keyword) {
  return (dispatch) => {
    const restaurants = [].concat.apply([], restaurantResponses.map((item) => {return item.data.restaurants})).reduce((o,item)=>{o[item.restaurant.id] = item.restaurant;return o;},{});
    var menuPromises = [];
    for(var key in restaurants) {
      menuPromises.push(fetchRestaurantMenus(restaurants[key]));
    }
    return axios.all(menuPromises).then((responses) => dispatch(listFilteredMenus(restaurants, responses, keyword)));
  };
}

function processSearchResponse(response, url, keyword) {
  return (dispatch) => {
    const found = response.data.results_found;
    const shown = response.data.results_shown;
    if(found > shown) {
      var more_restaurants = [];
      for(let i=found-shown;i>0;i-=shown) {
        more_restaurants.push(axios.get(`${url}&start=${found-i}`, CONFIG));
      }
      return axios.all(more_restaurants).then( (responses) => dispatch(processRestaurants(responses.concat([response]), keyword)) );
    } else {
      return dispatch(processRestaurants([response], keyword));
    }
  };
}

export function fetchAllDailyMenus(locality_id, keyword) {
  const url = `${ROOT_URL}/search?entity_type=subzone&entity_id=${locality_id}`;
  return (dispatch) => {
    dispatch(clearMenus());
    return axios.get(
      url, CONFIG
    ).then( (response) => dispatch(processSearchResponse(response, url, keyword)) );
  };
}
