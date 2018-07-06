var initialState = [];

export const order = (state = initialState, action) => {
  switch (action.type) {
    case 'get_order':
      return [...state, action.data];
    default:
      return state;
  }
};
