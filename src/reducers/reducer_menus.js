import { FETCH_MENUS, CLEAR_MENUS } from '../actions/fetch_menus';

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_MENUS:
      if(action.dailyMenu) {
        return [{id: action.dailyMenu.daily_menu_id, rname: action.restaurant.name}, ...state];
      }
    case CLEAR_MENUS:
      return [];
  }
  return state;
}
