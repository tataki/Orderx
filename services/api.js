const host = 'http://47.98.52.61:8000';
// const host = 'http://192.168.123.61:8000';
export const apiGetCategory = `${host}/v2/categorys/`;
export const apiPostOrder = `${host}/v2/orders/`;
export const apiGetFoods = `${host}/v2/categorys/`;
export const apiGetFood = `${host}/goods/`;
export const apiPostTalbe = `${host}/tables/`;
export const apiGetOrder = `${host}/v2/orders/`;
export const apiPostFood = `${host}/v2/shopcarts/`;
export const apiEmptyCart = `${host}/emptycart/`;
export const apiDoneOrder = `${host}/doneorder/`;

export function doneOrder(table) {
  return fetch(apiDoneOrder, {
    body: JSON.stringify({ table_id: table }),
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    }
  });
}
export const searchFood = function(name) {
  return fetch(apiGetFood + `?search=${name}`)
    .then(data => {
      return data.json();
    })
    .then(data => {
      return data;
    });
};
export const getOrder = function(table_id) {
  return fetch(apiGetOrder + `?table=${table_id}&pay_status=paying`)
    .then(data => {
      return data.json();
    })
    .then(data => {
      return data;
    });
};

export const getCategory = function() {
  return fetch(apiGetCategory)
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    });
};

export const postOrder = function(table_id, order_mount) {
  console.log(table_id);
  console.log(order_mount);
  return fetch(apiPostOrder, {
    body: JSON.stringify({
      table: table_id,
      order_mount: order_mount
    }),
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    }
  });
};

export const getFoods = function(params) {
  return fetch(apiGetFoods + params)
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    });
};

export const getFood = function(params) {
  return fetch(apiGetFood + params)
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    });
};

export const postTable = function(params, params2) {
  console.log('params' + params);
  return fetch(apiPostTalbe, {
    body: JSON.stringify({ number: params }),
    method: 'POST',
    headers: {
      'content-type': 'application/json'
    }
  })
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    });
};

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
