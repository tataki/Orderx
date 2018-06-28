export const table = (state={id:0,number:0},action)=>{
  switch (action.type){
    case 'GETTABLENUMBER':
      return {...state,...action.payload};
    default:
      return state;
  }
}