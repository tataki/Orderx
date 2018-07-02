export const table = (state = { id: 0, number: 0 }, action) => {
  switch (action.type) {
    case 'set_table':
      console.log('reducer');
      console.log(action.payload);
      console.log({ ...state, ...action.payload });
      return { ...state, ...action.payload };
    default:
      return state;
  }
};
