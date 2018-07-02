const Foods = [];
export const foods = (state = Foods, action) => {
  switch (action.type) {
    case 'add_food':
      for (var i = 0; i < state.length; i++) {
        if (state[i].food.id == action.payload.food.id) {
          state[i].food_num = action.payload.food_num;
          return [...state];
        }
      }
      return [...state, action.payload];
    case 'delete_food':
      for (var i = 0; i < state.length; i++) {
        if (state[i].food.id == action.payload.id) {
          state.splice(i, 1);
          return [...state];
        }
      }
    case 'empty_cart':
      // state = new Array();
      state.splice(0, state.length);
      return [...state];

    case 'get_cart_list':
      console.log('food reducer');
      console.log(action.foods);
      for (var i = 0; i < action.foods.length; i++) {
        let food = action.foods[i].goods;
        let food_num = action.foods[i].nums;
        state = [
          ...state,
          {
            food,
            food_num
          }
        ];
      }
      console.log(state);
      return state;
    default:
      return state;
  }
};
