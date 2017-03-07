import axios from 'axios';

const API_KEY = '9429e077298c3c7bfe5f97ef6626bb15';
const ROOT_URL = 'https://developers.zomato.com/api/v2.1';
const CONFIG = {
  'headers': {
    'user-key': API_KEY,
    'Accept': 'application/json'
  }
};

export const FETCH_CITIES = 'FETCH_CITIES';

export function fetchCities(query) {
  const url = `${ROOT_URL}/cities?q=${query}`;
  const request = axios.get(url,CONFIG);

  return {
    type: FETCH_CITIES,
    payload: request
  };
}
