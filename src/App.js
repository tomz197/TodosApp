import React from 'react';
import './App.css'
import TodoList from './components/TodoList/TodoList';
import AddTodoForm from "./components/AddTodoForm/AddTodoForm";

class TodoApp extends React.Component {

  render() {
    return (
      <div className="App">
        <h2>TODO</h2>
        <AddTodoForm/>
        <TodoList/>
      </div>
    );
  }
}

export default TodoApp;