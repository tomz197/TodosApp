import "./TodoList.css"
import React, {useState} from "react"

function TodoList(props) {
  const [filter, setFilter] = useState("");
  return (
    <>
    <div className="TodoFilter" onChange={(e) => setFilter(e.target.value)}>
        <input type="radio" value={undefined} name="filter" id="filter1"/> 
        <label htmlFor="filter1">all</label>
        <input type="radio" value="active" name="filter" id="filter2"/>
        <label htmlFor="filter2">in progress</label>
        <input type="radio" value="ended" name="filter" id="filter3"/>
        <label htmlFor="filter3">finished</label>
    </div>
    <ul className="TodoList">
      {props.items.map(item => 
      (item.state === filter || filter === "")
      && <li
        className={"item " + item.state}
        key={item.id}>
        <p>{item.text}</p>
        <div>
          <button onClick={(e) => props.handleState(item.id, "ended")}>finished</button>
          <button onClick={(e) => props.handleState(item.id, "active")}>in progress</button>
          <button onClick={(e) => props.handleDelete(item)}>delete</button>
        </div>
      </li>)}
    </ul>
    </>
  );
}

export default TodoList;