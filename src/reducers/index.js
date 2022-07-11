import todosReducer from "./todos";
import {combineReducers} from 'redux';

const AllReducers = combineReducers({
  todos: todosReducer
})

export default AllReducers;