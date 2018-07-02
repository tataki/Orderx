const apiPostTalbe = 'http://127.0.0.1:8000/tables/';
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
