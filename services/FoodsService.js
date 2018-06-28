const apiGetFoods = 'http://127.0.0.1:8000/v2/categorys/';
export const getFoods = function(params) {
  return fetch(apiGetFoods + params)
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    });
};
