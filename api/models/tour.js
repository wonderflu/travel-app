const { Schema, model } = require('mongoose');

const tourSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name field cannot be empty'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

const Tour = model('Tour', tourSchema);

module.exports = Tour;
