const express = require('express');
const router = express.Router();

const fs = require('fs');
const todosFile = '/todos.json';
let todos = require('../data/'+todosFile);


const updateData = () => {
  fs.writeFile('./data/'+todosFile, JSON.stringify(todos), (err) => err && console.log(err));
}


router.get('/', (req, res) => {
  res.status(200).send(todos);
})


router.post('/', (req, res) => {
  if (req.body.text === undefined) {
    console.log("todo POST: invalid JSON format");
    res.status(500).send({ok: false, Error: 'Invalid JSON format'});
    return;
  }
  if (typeof req.body.text !== 'string') {
    console.log("todo POST: wrong type")
    res.status(500).send({ok: false, Error: 'Invalid type'});
    return;
  }

  todos.push({
    text: req.body.text,
    state: 0,
    id: Date.now()
  })

  updateData();
  res.send(todos.at(-1))
})


router.put('/', (req, res) => {
  if (req.body.id === undefined || req.body.newState === undefined){
    console.log("todo PUT: invalid JSON format")
    res.status(500).send({ok: false, Error: 'Invalit JSON format'});
    return;
  }
  if (typeof req.body.newState !== 'number' || typeof req.body.id !== 'number') {
    console.log("todo PUT: wrong type")
    res.status(500).send({ok: false, Error: 'Invalid type'});
    return;
  }

  let changedItem;
  todos = todos.map(item => {
      if (item.id === req.body.id){
        changedItem = {...item, state: req.body.newState};
        return changedItem;
      }else return item;
    }
  );
  
  updateData();
  res.status(200).send({ok: true, changedItem});
})


router.delete('/:todoId', (req, res) => {
  let newList = todos;
  todos = newList.filter(item => item.id !== parseInt(req.params.todoId));
  updateData();
  res.status(200).send({ok: true, message: `Todo ${req.params.todoId} deleted`});
})

module.exports = router;