// const apiPostTalbe = 'http://127.0.0.1:8000/tables/';
import { apiPostTalbe } from '../services/api';
export function setTable(data, people) {
  return {
    type: 'set_table',
    payload: data,
    people: { people }
  };
}

export function postTableNumber(table_number, people) {
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
        dispatch(setTable(data, people));
      });
  };
}
