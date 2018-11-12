//const helmet = require("helmet")
const express = require('express');
const expressValidator = require("express-validator")
const path = require('path');
const bodyParser = require('body-parser');
const morgan  = require('morgan');
const cors = require('cors');
const passport = require('passport');
const cloudinary = require('cloudinary');

require('dotenv').config()

// Setting up mongoose
const mongoose = require('mongoose');
const config  = require ('./config/database');
mongoose.connect(config.database);


// setting up cloudinary
let { CLOUDINARY_API_KEY, CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_SECRET } = process.env;
cloudinary.config({ 
    cloud_name: CLOUDINARY_CLOUD_NAME, 
    api_key: CLOUDINARY_API_KEY, 
    api_secret: CLOUDINARY_API_SECRET
});

const index = require('./routes/index');
const payments = require('./routes/payments');
const reservations = require('./routes/reservations');
const users = require('./routes/users');
const hotels = require('./routes/hotels');

const app = express();

// Log request to console
app.use(morgan('dev'));
app.use(expressValidator());

//app.use(express.static('./public'));

//connecting helmet
//app.use(helmet())

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser MW
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// passport init
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);

// init cors
app.use(cors());

// Routes
app.use('/', index);
app.use('/users', users);
app.use('/payments', payments);
app.use('/reservations', reservations);
app.use('/hotels', hotels);
app.use('/*', index);

// Localhost setup
const PORT = 3001;
app.set('port', (process.env.PORT || PORT));

app.listen(PORT, function(){
    console.log('server started at port: ' + app.get('port'));
});
