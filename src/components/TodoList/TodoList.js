import "./TodoList.css"
import React, {useState} from "react"

function TodoList(props) {
  const [filter, setFilter] = useState("");
  let notStarted = [];
  let active = [];
  let ended = [];
  props.items.forEach(item => {
    const newItem = (item.state === filter || filter === "")
      ? <li
        className={"item " + item.state}
        key={item.id}>
          <p>{item.text}</p>
          <div>
            {item.state === "ended" && <button onClick={(e) => props.handleState(item.id, "")}>not started</button>}
            {item.state !== "ended" && <button onClick={(e) => props.handleState(item.id, "ended")}>finished</button>}
            {item.state === "active" && <button onClick={(e) => props.handleState(item.id, "")}>not started</button>}
            {item.state !== "active" && <button onClick={(e) => props.handleState(item.id, "active")}>in progress</button>}
            <button onClick={(e) => props.handleDelete(item)}>delete</button>
          </div>
        </li>
      : undefined;
    if (newItem !== undefined) {
      switch (item.state){
        case "active":
          active.push(newItem);
          break;
          
        case "ended":
          ended.push(newItem);
          break;
        default:
          notStarted.push(newItem);
      }
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