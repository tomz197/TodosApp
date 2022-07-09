import React from 'react';
import './App.css'
import TodoList from './components/TodoList/TodoList';
import AddTodoForm from "./components/AddTodoForm/AddTodoForm";

class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      filter: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleState = this.handleState.bind(this);
  }

  render() {
    return (
      <div className="App">
        <h2>TODO</h2>
        <AddTodoForm 
          handleSubmit={this.handleSubmit} 
          itemsLen={this.state.items.length}/>
        <TodoList
          items={this.state.items}
          handleDelete={this.handleDelete}
          handleState={this.handleState}
        />
      </div>
    );
  }

  handleState = (itemId, newState) => {
    this.setState(state => {
      let items = state.items.map(item => 
        item.id === itemId
        ? {...item, state: newState}
        : item
      );
      return {
        items
      }
    });
  }

  handleSubmit = (newItem) => {
    this.setState(state => {
      let items = state.items;
      items.push(newItem);

      return {
        items,
        text: ''
      };
    });
  }

  handleDelete = (item) => {
    this.setState(state => {
      let items = state.items;
      items = items.filter(it => it.id !== item.id);
      return {
        items
      }
    });
  }
}

export default TodoApp;