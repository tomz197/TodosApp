const addTodo = (item) => {
  return {
    type: 'ADDTODO',
    payload: item
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