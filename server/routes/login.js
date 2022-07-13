const express = require('express');
const router = express.Router();

const userModel = require('../models/user');


router.get('/', async (req, res) => {
  try {
    const userList = await userModel.find();
    res.status(200).send(userList);
  } catch (err) {
    res.status(500).send(err);
  }
})

async function getUser(req, res, next) {
  let findTodo
  try {
    findTodo = await userModel.findById(req.params.id);
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