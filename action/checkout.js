const apiGetOrder = 'http://127.0.0.1:8000/v2/orders/';
export function get_order(data) {
  console.log('getorder');
  return {
    type: 'get_order',
    payload: data
  };
}

export function getOrder(table_id) {
  return dispatch => {
    return fetch(apiGetOrder + `?table_id=${table_id}&pay_status=paying`)
      .then(data => {
        data.json();
      })
      .then(data => {
        dispatch(get_order(data));
      });
  };
}
