const apiGetCategory = 'http://127.0.0.1:8000/v2/categorys/';
export const getCategory = function() {
  return fetch(apiGetCategory)
    .then(res => {
      return res.json();
    })
    .then(data => {
      return data;
    });
};
