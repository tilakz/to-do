//Reducer changes states by taking an action as an argument, in which it then returns a new state.
//Pass the previous state and actions to the reducer functions
//Reducers are pure functions

import { combineReducers } from 'redux'
import {
  ADD_TODO,
  TOGGLE_TODO,
  SET_VISIBILITY_FILTER,
  VisibilityFilters
} from './actions'


const { SHOW_ALL } = VisibilityFilters

const visibilityFilter = (state = SHOW_ALL, action) => {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

//reducer compositions - one reducer

const todo = (state, action) => {

  switch (action.type) {
    case ADD_TODO:
      return{
          id: action.id,
          text: action.text,
          completed: false
        };

    case TOGGLE_TODO:
      if(state.id !== action.id) {
          return state;
        }
        return {
          ...state,
          completed: !state.completed
        };

    default:
      return state;

      }
  };

const todos = (state = [], action) => {

  switch (action.type){

    case ADD_TODO:
      return [
        ...state,
        todo(undefined, action)
      ];

    case TOGGLE_TODO:
      return state.map(t => todo(t, action));

    default:
      return state;
    }
};

const todoApp = combineReducers({
  todos: todos,
  visibilityFilter: visibilityFilter
})

export default todoApp
