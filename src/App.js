import React from 'react';
import './App.css'
import Main from './Main'
import LoginForm from "./components/LoginForm/LoginForm";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

class TodoApp extends React.Component {

  render() {
    return (
      <Router>
          <div className="App" style={{ overflowX: 'hidden' }}>
            <Routes>
              <Route path="/" element={<LoginForm/>}/>
              <Route path="/todo" element={<Main/>}/>
            </Routes>
          </div>
      </Router>
    );
  }
}

export default TodoApp;