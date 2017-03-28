import { CLEAR_MENUS, LIST_MENUS } from '../actions/fetch_menus';

function getRestaurant(restaurants, menuObject) {
  const url = menuObject.config.url;
  return restaurants[parseInt(url.substr(url.indexOf('=')+1,url.length))];
}

function hasKeyword(dishObject, keyword) {
  return dishObject.dish.name.toLowerCase().indexOf(keyword) != -1
}

export default function(state = {list: [], loader: false}, action) {
  switch (action.type) {
    case LIST_MENUS:
    var menus = [];
    for(var i = 0;i<action.menus.length;i++) {
      if(action.menus[i].status == 200 && action.menus[i].data.daily_menus[0]) {
        const menu = action.menus[i].data.daily_menus[0].daily_menu;
        const restaurant = getRestaurant(action.restaurants, action.menus[i]);
        for(var j = 0;j<menu.dishes.length;j++) {
          if(hasKeyword(menu.dishes[j], action.keyword)) {
            menus.push({
              restaurant,
              dish: menu.dishes[j].dish
            });
          }
        }
      }
    }
    return {list: menus, loader: false};
    case CLEAR_MENUS:
    return {list: [], loader: true};
  }
  return state;
}
