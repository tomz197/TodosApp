const addTodo = (text) => {
  return {
    type: 'ADDTODO',
    payload: text
  };
};
const deleteTodo = (item) => {
  return {
    type: 'DELETETODO',
    payload: item
  };
};
const updateTodoState = (itemId, newState) => {
  return {
    type: 'UPDATETODOSTATE',
    itemId: itemId,
    newState: newState
  };
}

export { addTodo, deleteTodo, updateTodoState };