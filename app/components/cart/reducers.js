import { combineReducers } from 'redux';
import { ADD_ITEM, DELETE_ITEM } from './actions';


function item(state, action) {
  switch (action.type) {
    case ADD_ITEM:
      return action.item;
    case DELETE_ITEM:
      if (state.id === action.item.id) {
        return;
      }
      return action.item;
    default:
      return state;
  }
}

function items(state = [], action) {
  switch (action.type) {
    case ADD_ITEM:
      return [
        ...state,
        item(undefined, action)
      ]
    case DELETE_ITEM:
      let index = -1;
      let currentIndex = -1;
      for (let cartItem of state) {
        currentIndex += 1;
        if (cartItem.id === action.item.id) {
          index = currentIndex;
        }
      }
      if (index > -1) {
        state.splice(index, 1);
      }
      return state
    default:
      return state
  }
}

const cartApp = combineReducers({
  items
});

export default cartApp;
