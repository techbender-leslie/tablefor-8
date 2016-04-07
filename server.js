var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    passport = require('passport'),
    flash = require('connect-flash'),

    morgan = require('morgan'),
    cookieParser = require('cookie-parser'),
    session = require('express-session');

//var configDB = require('./config/database.js');

// configuration =====================
//mongoose.connect(configDB.url);
mongoose.connect('mongodb://localhost/charliestable');

require ('./config/passport')(passport);

// express stuff =====================
app.use(morgan('dev'));
app.use(cookieParser());
//app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));


// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// set view engine to hbs (handlebars)
app.set('view engine', 'hbs');

// passport stuff =====================
app.use(session({ secret: 'techbenderleslietakingovertheworld'}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// routes ==============================
// require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
// require('./app/routes.js')(app, passport);

app.get('/', function(req, res) {
        res.render('index');
        console.log('render index from the back server');
    });

// launch ==============================
app.listen(3000, function() {
  console.log('server started on localhost:3000');
});



