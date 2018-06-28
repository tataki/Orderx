const apiPostTalbe = 'http://127.0.0.1:8000/tables/';

export function getTableNumber(data) {
  return {
    type: 'GETTABLENUMBER',
    payload: data
  };
}

export function postTableNumber(table_number) {
  return dispatch => {
    return fetch(apiPostTalbe, {
      body: JSON.stringify({ number: table_number }),
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
}
