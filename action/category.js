const apiGetShopCarts = 'http://127.0.0.1:8000/v2/shopcarts/';

export function cartFood(data) {
  return {
    type: 'get_cart_list',
    foods: data
  };
}

export function getCartFood(table) {
  console.log('获得foods');
  console.log(table);
  return dispatch => {
    return fetch(apiGetShopCarts + `?table_id=${table}`)
      .then(data => {
        return data.json();
      })
      .then(data => {
        dispatch(cartFood(data));
      })
      .catch(error => {
        console.log('Request failed', error);
      });
  };
}
