require('dotenv').config();

const mongoose = require('mongoose');
const express = require('express');
const app = express();
const router = require('./api/routes/index');

const { PORT, MONGO_DB } = require('./configs');
const errorHandler = require('./api/middlewares/errorHandler');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

mongoose.connect(MONGO_DB).then(() => {
  console.log('Connected to MongoDB.');
});
app.listen(PORT, () => {
  console.log(`Server has been started on ${PORT}`);
});
