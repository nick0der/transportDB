require('./models/db')

const express = require('express');
const Handlebars = require('handlebars');
const path = require('path');
const exphbs = require('express-handlebars');
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access');
const bodyparser = require('body-parser');


const accountantController = require('./controllers/accountantController');
const busController = require('./controllers/busController');
const cashierController = require('./controllers/cashierController');
const chiefController = require('./controllers/chiefController');
const driverController = require('./controllers/driverController');
const garageController = require('./controllers/garageController');
const mechanicController = require('./controllers/mechanicController');
const routeController = require('./controllers/routeController');
const routeTaxiController = require('./controllers/routeTaxiController');
const taxiController = require('./controllers/taxiController');


var app = express();
app.use(express.static(__dirname + '/public'));

app.use(bodyparser.urlencoded({
	extended: true
}));
app.use(bodyparser.json());
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({ extname: 'hbs', defaultLayout: 'mainLayout', layoutsDir: __dirname + '/views/layouts/',  handlebars: allowInsecurePrototypeAccess(Handlebars) }));
app.set('view engine', 'hbs');


app.listen(3000, () => {
	console.log('Express server started at port : 3000');
});

app.use('/accountant', accountantController);
app.use('/bus', busController);
app.use('/cashier', cashierController);
app.use('/chief', chiefController);
app.use('/driver', driverController);
app.use('/garage', garageController);
app.use('/mechanic', mechanicController);
app.use('/route', routeController);
app.use('/routeTaxi', routeTaxiController);
app.use('/taxi', taxiController);

app.get('/', function(req, res){
    res.sendFile('/index.html');
});
