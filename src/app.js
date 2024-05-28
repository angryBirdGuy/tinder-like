const express = require('express');
const mongoose = require('mongoose');
const usersRouter = require('./routes/users');

const app = express();

mongoose
  .connect('mongodb://localhost:27017/tinder', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error(err));

app.use((req, res, next) => {
  req.db = mongoose.connection.db;
  next();
});

app.use('/users', usersRouter);

module.exports = app;
