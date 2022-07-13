import './LoginForm.css';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTodo } from '../../actions/todos';

function LoginForm() {
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [redirect, setRedirect] = useState(<></>);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.length || password.length) {
      return;
    }
    fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        username: username,
        password: password
      })})
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.error(err));

    setUsername("");
    setPassword("");
  }

  return (
    <form onSubmit={handleSubmit} className="AddTodoForm">
      <input
        id="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <input
        type="password"
        id="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button type="submit">
        Login
      </button>
      {redirect}
    </form>
  );
}

export default LoginForm;