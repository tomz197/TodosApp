import "./TodoList.css";
import React, {useState, useEffect} from "react";
import {useSelector, useDispatch} from 'react-redux';
import {deleteTodo, updateTodoState, loadTodos} from '../../actions/todos';

const TodoList = () => {
  const dispatch = useDispatch();
  const items = useSelector(state => state.todos);
  const [filter, setFilter] = useState("");
  let notStarted = [];
  let active = [];
  let ended = [];

  useEffect(async () => {
    try{
      const res = await fetch('http://localhost:8080/todo')
      const json = await res.json();
      dispatch(loadTodos(json));
      console.log(res);
    }catch{
      console.log("failed to load")
    }
  }, []);
  
  const handleUpdate = (itemId, newState) => {
    fetch('http://localhost:8080/todo', {
      method: 'PUT',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({
        id: itemId,
        newState: newState
      })
    }).then((res) => {
      console.log(res);
      return res.json();
    }).then((data) => {
      dispatch(updateTodoState(itemId, newState));
    });
  }

  const handleDelete = (itemId) => {
    fetch('http://localhost:8080/todo/'+itemId, {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }).then((res) => {
      console.log(res);
      return res.json();
    }).then((data) => {
      dispatch(deleteTodo(itemId));
    });
  }

  items.forEach(item => {
    if (item.state !== filter && filter !== "") return;
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
          {item.state === "ended" 
          && <button onClick={(e) => handleUpdate(item.id, 0)}>not&nbsp;started</button>}
          {item.state !== "ended" 
          && <button onClick={(e) => handleUpdate(item.id, 2)}>finished</button>}
          {item.state === "active" 
          && <button onClick={(e) => handleUpdate(item.id, 0)}>not&nbsp;started</button>}
          {item.state !== "active" 
          && <button onClick={(e) => handleUpdate(item.id, 1)}>in&nbsp;progress</button>}
          <button onClick={(e) => handleDelete(item.id)}>delete</button>
        </div>
      </li>
    
    switch (item.state){
      case 1:
        active.push(newItem);
        break;
      case 2:
        ended.push(newItem);
        break;
      default:
        notStarted.push(newItem);
    }
  });

  const handleFilter = (e) => {
    setFilter(e.target.value === filter ? "" : e.target.value)
  }


  return (
    <>
    <div className="TodoFilter" onChange={(e) => handleFilter(e)}>
        <div>
          <div className={filter === '' ? "selectedFilter" : ""}>
            <input type="radio" onClick={(e) => handleFilter(e)} value={undefined} name="filter" id="filter1" defaultChecked/>
            <label htmlFor="filter1">all</label>
          </div>
          <div className={filter === 'active' ? "selectedFilter" : ""}>
            <input type="radio" onClick={(e) => handleFilter(e)} value="active" name="filter" id="filter2"/>
            <label htmlFor="filter2">in progress</label>
          </div>
          <div className={filter === 'ended' ? "selectedFilter" : ""}>
            <input type="radio" onClick={(e) => handleFilter(e)} value="ended" name="filter" id="filter3"/>
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