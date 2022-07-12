const addTodo = (text) => {
  return {
    type: 'ADDTODO',
    payload: text
  };
};
const loadTodos = (todos) => {
  return {
    type: 'LOADTODOS',
    payload: todos
  };
};
const deleteTodo = (itemId) => {
  return {
    type: 'DELETETODO',
    payload: itemId
  };
};
const updateTodoState = (itemId, newState) => {
  return {
    type: 'UPDATETODOSTATE',
    itemId: itemId,
    newState: newState
  };
}

export { addTodo, deleteTodo, updateTodoState, loadTodos };