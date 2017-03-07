import { FETCH_LOCALITIES } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_LOCALITIES:
    return action.payload.data.subzones;
  }
  return state;
}
