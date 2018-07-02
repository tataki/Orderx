const apiGetFoods = 'http://127.0.0.1:8000/v2/categorys/';
const apiGetFood = 'http://127.0.0.1:8000/goods/';
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
