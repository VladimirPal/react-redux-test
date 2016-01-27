export const ADD_ITEM = 'ADD_ITEM'
export const DELETE_ITEM = 'DELETE_ITEM'

export function addItem(item) {
  return {
    type: ADD_ITEM,
    item: item
  };
}

export function deleteItem(item) {
  return {
    type: DELETE_ITEM,
    item: item
  }
}
