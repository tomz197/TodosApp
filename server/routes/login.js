const dotenv = require("dotenv")
dotenv.config('../.env')

const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = require('../models/user');


router.get('/', async (req, res) => {
  try {
    const userList = await userModel.find();
    res.status(200).send(userList);
  } catch (err) {
    res.status(500).send(err);
  }
})

router.post('/', getUser, async (req, res) => {
  
  if (res.user != null){
    const accessToken =jwt.sign({ id: res.user._id }, process.env.ACCESS_TOKEN_SECRET)
    
    return res.status(201).json({accessToken: accessToken});
  }
  
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const newUser = new userModel({
      username: req.body.username,
      password: hashedPassword,
    });

    newUser.save();
    
    const accessToken = jwt.sign({ id: newUser._id }, process.env.ACCESS_TOKEN_SECRET)
    
    return res.status(201).json({accessToken: accessToken});
  } catch (err) {
    return res.status(500).json(err);
  }
})

async function getUser(req, res, next) {
  let findUser = null;
  try {
    if (req.body.password === undefined || req.body.username === '') {
      throw new Error('empty string')
    }
    findUser = await userModel.findOne({username: req.body.username});
    if (findUser != null) {
      if (!await bcrypt.compare(req.body.password, findUser.password)) 
      {
        return res.status(500).json({ message: "wrong password" });
      }
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.user = findUser;
  next();
}

module.exports = router;