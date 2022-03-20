const mongoose = require('mongoose');

var routeSchema = new mongoose.Schema({
  start: {
    type: String,
    required: 'This field is required.'
  },
  finish: {
    type: String,
    required: 'This field is required.'
  },
  distance: {
    type: Number,
    required: 'This field is required.'
  }
});

mongoose.model('Route', routeSchema);
