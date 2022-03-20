const mongoose = require('mongoose');

var garageSchema = new mongoose.Schema({
  number: {
    type: String,
    required: 'This field is required.'
  },
  address: {
    type: String,
    required: 'This field is required.'
  },
  area: {
    type: Number,
    required: 'This field is required.'
  }
});

mongoose.model('Garage', garageSchema);
