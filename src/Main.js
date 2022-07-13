import React from 'react';
import TodoList from './components/TodoList/TodoList';
import AddTodoForm from "./components/AddTodoForm/AddTodoForm";

function Main() {
  return (
    <>
      <h2>TODO</h2>
      <AddTodoForm/>
      <TodoList/>
    </>
  );
}
export default Main;