require('dotenv').config();

const mongoose = require('mongoose');
const { PORT, MONGO_DB } = require('./configs');

const app = require('./app');

mongoose.connect(MONGO_DB).then(() => {
  console.log('Connected to MongoDB.');
});
app.listen(PORT, () => {
  console.log(`Server has been started on ${PORT}`);
});
