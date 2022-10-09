const express = require('express');
const app = express();
const router = require('./api/routes/index');

const errorHandler = require('./middlewares/errorHandler');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', router);
app.use(errorHandler);

module.exports = app;
