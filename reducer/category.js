var initialState = {lists:[]}

export const category = (state=initialState,action)=>{
  switch (action.type){
    case 'GETCATEGORY':
      return {...state,lists:action.payload};
    default:
      return state;
  }
}