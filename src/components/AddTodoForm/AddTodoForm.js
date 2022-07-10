import './AddTodoForm.css';
import React, {useState} from 'react';

const AddTodoForm = (props) => {
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
    props.handleSubmit(newItem);
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