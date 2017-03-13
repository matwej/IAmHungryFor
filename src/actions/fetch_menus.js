import { CONFIG, ROOT_URL } from './index';
import axios from 'axios';

export const FETCH_MENUS = 'FETCH_MENUS';
export const CLEAR_MENUS = 'CLEAR_MENUS';

function createMenuAction(restaurant, dailyMenu) {
  console.log('actioon', restaurant, dailyMenu);
  return {
    type: FETCH_MENUS,
    restaurant,
    dailyMenu
  };
}

export function clearMenus() {
  return {type: CLEAR_MENUS}
}

function fetchRestaurantMenus(restaurant) {
  const url = `${ROOT_URL}/dailymenu?res_id=${restaurant.id}`;
  return (dispatch) => {
    return axios.get(
      url, CONFIG
    ).then(
      (response) => dispatch(createMenuAction(restaurant, response.data.daily_menus[0].daily_menu))
    ).catch(
      (error) => {}
    );
  };
}

function handleSearchResponse(response) {
  return (dispatch) => {
    const restaurants = response.data.restaurants;
    var menuPromises = [];
    for (var i = 0, len = 2; i < len; i++) { // restaurants.length
      menuPromises.push(dispatch(fetchRestaurantMenus(restaurants[i].restaurant)));
    }
    return Promise.all(menuPromises);
  };
}

function handleOther(response, url) {
  const found = response.data.results_found;
  const shown = response.data.results_shown;
  if(found > shown) {
    for(let i=found-shown;i>0;i-=shown) {
      const count_url = `${url}&start=${found-i}`;
      console.log(count_url);
    }
  }
  return Promise.all();
}

export function fetchAllDailyMenus(locality_id, keyword) {
  const url = `${ROOT_URL}/search?entity_type=subzone&entity_id=${locality_id}`;
  return (dispatch) => {
    dispatch(clearMenus());

    return axios.get(
      url, CONFIG
    ).then(
      (response) => {
        dispatch(handleSearchResponse(response));//,
        // dispatch(handleOther(response, url))
      }
    );
  };
}
