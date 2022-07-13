const express = require('express');
const router = express.Router();

const todoModel = require('../models/todo');


router.get('/', async (req, res) => {
  try {
    const todoList = await todoModel.find();
    res.status(200).send(todoList);
  } catch (err) {
    res.status(500).send(err);
  }
})


router.post('/', async (req, res) => {
  if (req.body.text === undefined) {
    console.log("todo POST: invalid JSON format");
    res.status(500).send({Error: 'Invalid JSON format'});
    return;
  }
  if (typeof req.body.text !== 'string') {
    console.log("todo POST: wrong type")
    res.status(500).send({Error: 'Invalid type'});
    return;
  }

  const newTodo = new todoModel({
    text: req.body.text
  })
  
  try {
    const createdTodo = await newTodo.save();
    res.status(201).json(createdTodo);
  } catch (err) {
    res.status(500).json(err);
  }
})


router.put('/:id', getTodo, async (req, res) => {
  if (req.body.newState === undefined){
    console.log("todo PUT: invalid JSON format")
    res.status(500).send({Error: 'Invalit JSON format'});
    return;
  }
  if (typeof req.body.newState !== 'number') {
    console.log("todo PUT: wrong type")
    res.status(500).send({Error: 'Invalid type'});
    return;
  }

  res.todo.state = req.body.newState;

  
  try {
    const updatedTodo = await res.todo.save();
    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
})


router.delete('/:id', getTodo, async (req, res) => {
  try {
    await res.todo.remove()
    res.status(200).json({ message: 'Deleted Todo' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
})

async function getTodo(req, res, next) {
  let findTodo
  try {
    findTodo = await todoModel.findById(req.params.id);
    if (findTodo == null) {
    return res.status(404).json({ message: 'Cannot find todo' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.todo = findTodo;
  next();
}

module.exports = router;