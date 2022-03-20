const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/TransportDB', { useNewUrlParser: true }, (err) => {
	if (!err) {console.log('MongoDB Connection Succeeded.')}
	else {console.log('Error in DB connection: ' + err)}
});

require('./accountant.model');
require('./bus.model');
require('./cashier.model');
require('./chief.model');
require('./driver.model');
require('./garage.model');
require('./mechanic.model');
require('./route.model');
require('./routeTaxi.model');
require('./taxi.model');
