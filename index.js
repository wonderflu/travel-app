require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const { PORT, MONGO_DB } = require('./configs');

mongoose.connect(MONGO_DB).then(() => {
  console.log('Connected to MongoDB.');
});
app.listen(PORT, () => {
  console.log(`Server has been started on ${PORT}`);
});
