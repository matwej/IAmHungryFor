import { CLEAR_MENUS, LIST_MENUS } from '../actions/fetch_menus';

function findRestaurantById(restaurants, res_id) {
  for (var i = 0, len = restaurants.length; i < len; i++) {
    if(restaurants[i].restaurant.id == res_id) {
      return restaurants[i].restaurant;
    }
  }
  return null;
}

export default function(state = [], action) {
  switch (action.type) {
    case LIST_MENUS:
    const menus = action.menus.map((menuData) => {
      if(menuData.status == 200 && menuData.data.daily_menus[0]) {
        const menu = menuData.data.daily_menus[0].daily_menu;
        const url = menuData.config.url;
        const restaurant = findRestaurantById(action.restaurants, url.substr(url.indexOf('=')+1,url.length));
        return {
          restaurant,
          menu,
        };
      };
    });
    return state.concat(menus.filter((item)=>{return item != undefined}));
    case CLEAR_MENUS:
    return [];
  }
  return state;
}
