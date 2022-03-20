const mongoose = require('mongoose');

var mechanicSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: 'This field is required.'
  },
  salary: {
    type: String,
    required: 'This field is required.'
  },
  age: {
    type: Number,
    required: 'This field is required.'
  },
  email: {
    type: String
  },
  mobile: {
    type: String,
    required: 'This field is required.'
  }
});

// Custom validation for email
mechanicSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');

mongoose.model('Mechanic', mechanicSchema);
