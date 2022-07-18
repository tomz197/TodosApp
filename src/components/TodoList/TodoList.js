import "./TodoList.css";
import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {deleteTodo, updateTodoState, loadTodos} from '../../actions/todos';

const TodoList = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.todos);
  const [filter, setFilter] = useState("-1");
  let notStarted = [];
  let active = [];
  let ended = [];

  const getTodos = async () => {
    fetch('http://localhost:8080/todo', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': localStorage.getItem('accessToken')
      }
    })
    .then((res) =>  res.json())
    .then((data) => dispatch(loadTodos(data)))
    .catch((err) => console.error(err));
  }
  
  useEffect(() => {
    getTodos();
  }, []);
  
  const handleUpdate = (itemId, newState) => {
    fetch('http://localhost:8080/todo/'+itemId, {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': localStorage.getItem('accessToken')
      },
      body: JSON.stringify({
        newState: newState
      })
    })
    .then((res) => res.json())
    .then((data) => dispatch(updateTodoState(itemId, newState)))
    .catch((err) => console.error(err));
  }

  const handleDelete = (itemId) => {
    fetch('http://localhost:8080/todo/'+itemId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Authorization': localStorage.getItem('accessToken')
      }
    })
    .then((res) => res.json())
    .then((data) => dispatch(deleteTodo(itemId)))
    .catch((err) => console.error(err));
  }

  items.forEach(item => {
    if (item.state !== parseInt(filter) && filter !== "-1") return;
    let itemClass;
    switch (item.state){
      case 1:
        itemClass = "active";
        break;
      case 2:
        itemClass = "ended";
        break;
      default:
        itemClass = "notStarted";
    }
    const newItem = 
      <li
        className={"item " + itemClass}
        key={item.id}>
        <p>{item.text}</p>
        <div>
          {item.state === 2 
          && <button onClick={(e) => handleUpdate(item._id, 0)}>not&nbsp;started</button>}
          {item.state !== 2 
          && <button onClick={(e) => handleUpdate(item._id, 2)}>finished</button>}
          {item.state === 1 
          && <button onClick={(e) => handleUpdate(item._id, 0)}>not&nbsp;started</button>}
          {item.state !== 1 
          && <button onClick={(e) => handleUpdate(item._id, 1)}>in&nbsp;progress</button>}
          <button onClick={(e) => handleDelete(item._id)}>delete</button>
        </div>
      </li>
    
    switch (item.state){
      case 0:
        notStarted.push(newItem);
        break;
      case 1:
        active.push(newItem);
        break;
      case 2:
        ended.push(newItem);
        break;
      default:
        console.log("Invalid todo status");
    }
  });

  const handleFilter = (e) => {
    setFilter(e.target.value === filter ? "-1" : e.target.value)
  }


  return (
    <>
    <div className="TodoFilter" onChange={(e) => handleFilter(e)}>
        <div>
          <div className={filter === '-1' ? "selectedFilter" : ""}>
            <input type="radio" onClick={(e) => handleFilter(e)} value="-1" name="filter" id="filter1" defaultChecked/>
            <label htmlFor="filter1">all</label>
          </div>
          <div className={filter === '0' ? "selectedFilter" : ""}>
            <input type="radio" onClick={(e) => handleFilter(e)} value="0" name="filter" id="filter1" defaultChecked/>
            <label htmlFor="filter1">Not Started</label>
          </div>
          <div className={filter === '1' ? "selectedFilter" : ""}>
            <input type="radio" onClick={(e) => handleFilter(e)} value="1" name="filter" id="filter2"/>
            <label htmlFor="filter2">in progress</label>
          </div>
          <div className={filter === '2' ? "selectedFilter" : ""}>
            <input type="radio" onClick={(e) => handleFilter(e)} value="2" name="filter" id="filter3"/>
            <label htmlFor="filter3">finished</label>
          </div>
        </div>
    </div>
    <ul className="TodoList">
      {notStarted.length > 0 && <div><h4>Not started</h4>{notStarted}</div>}
      {active.length > 0 && <div><h4>In progress</h4>{active}</div>}
      {ended.length > 0 && <div><h4>Finished</h4>{ended}</div>}
    </ul>
    </>
  );
}

export default TodoList;