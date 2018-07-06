import { apiPostFood, apiEmptyCart } from '../services/api';

export function addFood(data, num) {
  return {
    type: 'add_food',
    payload: { food: data, food_num: num }
  };
}
export function delFood(data) {
  return {
    type: 'delete_food',
    payload: data
  };
}

export function empty_Cart() {
  return {
    type: 'empty_cart'
  };
}

export function postAddFood(data, num, table) {
  return dispatch => {
    return fetch(apiPostFood, {
      body: JSON.stringify({ table: table, nums: num, goods: data.id }),
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    }).then(() => {
      dispatch(addFood(data, num));
    });
  };
}

export function deleteFood(data, table) {
  return dispatch => {
    return fetch(apiPostFood + `${data.id}/`, {
      body: JSON.stringify({ table_id: table }),
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    }).then(() => {
      dispatch(delFood(data));
    });
  };
}

export function emptyCart(table) {
  return dispatch => {
    return fetch(apiEmptyCart, {
      body: JSON.stringify({ table_id: table }),
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      }
    }).then(() => {
      dispatch(empty_Cart());
    });
  };
}
