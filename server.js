const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser')
const path = require('path');
const compression = require('compression');

const app = express();
const port = process.env.port || 3000;

app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.use(morgan('common'));

//Compress all routes
app.use(compression());

//IMPORT ROUTES
const indexRoute = require('./routes/index');
const listspedRoute = require('./routes/listsped');
const deletespedRoute = require('./routes/deletesped');
const checkaddressRoute = require('./routes/checkaddress');
const addparcelRoute = require('./routes/addparcel');
//ROUTES
app.use('/', indexRoute)
app.use('/', listspedRoute)
app.use('/', deletespedRoute)
app.use('/', checkaddressRoute)
app.use('/', addparcelRoute)


//NOIP
/*
var NoIP = require('no-ip')

var noip = new NoIP({
    hostname: 'lasvacloud.ddns.net',
    user: 'yu.gi99@hotmail.it',
    pass: 'Trottola1!'
})

noip.on('error', function(err) {
    console.log(err)
})

noip.on('success', function(isChanged, ip) {
    console.log(isChanged, ip)
})

noip.update()
*/

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
})