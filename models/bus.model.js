const mongoose = require('mongoose');

var busSchema = new mongoose.Schema({
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

mongoose.model('Bus', busSchema);
