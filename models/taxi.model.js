const mongoose = require('mongoose');

var taxiSchema = new mongoose.Schema({
  model: {
    type: String,
    required: 'This field is required.'
  },
  color: {
    type: String,
    required: 'This field is required.'
  },
  seats: {
    type: Number,
    required: 'This field is required.'
  },
  trackNumber: {
    type: String,
    required: 'This field is required.'
  }
});

mongoose.model('Taxi', taxiSchema);
