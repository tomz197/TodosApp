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
    fetch('http://localhost:8080/todo', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        text: inputText,
      })
    }).then((res) => {
      console.log(res);
      return res.json();
    }).then((data) => {
      console.log(data);
      dispatch(addTodo(data));
    });
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