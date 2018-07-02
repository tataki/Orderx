import { combineReducers } from 'redux';
import { table } from './home';
import { foods } from './food';
export default combineReducers({
  table,
  foods
});
