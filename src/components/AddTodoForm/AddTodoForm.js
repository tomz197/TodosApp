import './AddTodoForm.css';
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {addTodo} from '../../actions/todos';

const AddTodoForm = () => {
  const dispatch = useDispatch();
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!inputText.length) {
      return;
    }
    const newItem = {
      text: inputText,
      state: "",
      id: Date.now()
    };
    dispatch(addTodo(newItem));
    setInputText("");
  }

  return (
    <form onSubmit={handleSubmit} className="AddTodoForm">
      <p>What needs to be done?</p>
      <input
        id="new-todo"
        onChange={(e) => setInputText(e.target.value)}
        value={inputText}
      />
      <button>
        Add
      </button>
    </form>
  );
}

export default AddTodoForm;