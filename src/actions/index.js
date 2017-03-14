import axios from 'axios';

const API_KEY = '9429e077298c3c7bfe5f97ef6626bb15';
export const ROOT_URL = 'https://developers.zomato.com/api/v2.1';
export const CONFIG = {
  headers: {
    'user-key': API_KEY,
    'Accept': 'application/json'
  },
  validateStatus: (status) => {
    return status < 500;
  }
};

export const FETCH_CITIES = 'FETCH_CITIES';
export const FETCH_LOCALITIES = 'FETCH_LOCALITIES';

export function fetchCities(query) {
  const url = `${ROOT_URL}/cities?q=${query}`;
  const request = axios.get(url,CONFIG);

  return {
    type: FETCH_CITIES,
    payload: request
  };
}

export function fetchLocalities(city_id) {
  const url = `${ROOT_URL}/subzones?city_id=${city_id}`;
  const request = axios.get(url,CONFIG);

  return {
    type: FETCH_LOCALITIES,
    payload: request
  };
}
