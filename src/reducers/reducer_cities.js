import { FETCH_CITIES } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_CITIES:
    return action.payload.data.location_suggestions;
  }
  return state;
}
