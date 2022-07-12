const express = require('express');
let cors = require('cors');
const app = express();
const port = 8080;


const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/todo')
const db = mongoose.connection;

db.on('error', err => console.error(err));
db.once('open', () => console.log('Connected to MongoDB'))


app.use(express.json(), cors({ origin: '*' }));

app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      console.error(err);
      return res.status(400).send({ status: 404, message: err.message }); // Bad request
  }
  next();
});

const todoRouter = require('./routes/todo')
app.use('/todo', todoRouter);



app.get('/', (req, res) => {
  res.status(200).send('Working');
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})