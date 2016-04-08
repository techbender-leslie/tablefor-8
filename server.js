var express = require('express'),
    app = express(),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    auth = require('./resources/auth');
    
require('dotenv').load();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// serve static files from public folder
app.use(express.static(__dirname + '/public'));

// set view engine to hbs (handlebars)
app.set('view engine', 'hbs');

mongoose.connect('mongodb://localhost/charliestable');

// // passport stuff =====================
// app.use(session({ secret: 'techbenderleslietakingovertheworld'}));
// app.use(passport.initialize());
// app.use(passport.session());
// app.use(flash());

var User = require('./models/user');
var Dinner = require('./models/dinner');

// ROUTES ==========================================

// User profile APIs ===============================
app.get('/api/me', auth.ensureAuthenticated, function (req, res) {
  User.findById(req.user, function (err, user) {
    res.send(user.populate('dinners'));
  });
});

app.put('/api/me', auth.ensureAuthenticated, function (req, res) {
  User.findById(req.user, function (err, user) {
    if (!user) {
      return res.status(400).send({ message: 'User not found' });
    }
    user.displayName = req.body.displayName || user.displayName;
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;
    user.save(function(err) {
      res.send(user.populate('dinners'));
    });
  });
});


// Dinners APIs =======================================

app.get('/api/dinners', function (req, res) {
  Dinner.find(function (err, allDinners) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(allDinners);
    }
  });
});

app.post('/api/dinners', auth.ensureAuthenticated, function (req, res) {
  User.findById(req.user, function(err, user) {

    var newDinner = new Dinner(req.body);
    newDinner.save(function (err, savedDinner) {
      if (err) {
        res.status(500).json({ error: err.message});
      } else {
        user.dinners.push(newDinner);
        user.save();
        res.json(savedDinner);
      }
    });
  });
});

app.get('/api/dinners/:id', function (req, res) {
  var dinnerId = req.params.id;

  Dinner.findOne({ _id: dinnerId }, function (err, foundDinner) {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      res.json(foundDinner);
    }
  });
});

// app.put('/api/dinners/:id', function (req, res) {
//   User.findById(req.user, function(err, user) {

//     var dinnerId = req.params.id;

//     Dinner.findOne({ _id: dinnerId }, function (err, foundDinner) {
//       if (err) {
//         res.status(500).json({ error: err.message });
//       } else {
//         foundDinner.dinner


//         foundDinner.dinnername = req.body.dinner_name;
// //      var image = req.body.image;
// //      var cuisine_type = req.body.cuisine_type;
// //      var drinks =req.body.drinks;
// //      var where = req.body.where;
// //      var capacity = req.body.capacity;
// //      var calendar = req.body.calendar;
// //      var time = req.body.time;
// //      var dishes = req.body.dishes;
// //      var hosted_by = req.body.hosted_by;
// //      var guests = req.body.guests;
// //      var notes = req.body.notes;
//       }
//     })
//   })
// })

app.delete('/api/dinners/:id', auth.ensureAuthenticated, function (req, res) {
  User.findById(req.user, function(err, user) {
  //   var id= req.params.id;
    // console.log('deleting dinner', id);

    Dinner.remove({_id: id}, function(err, deletedDinner) {
      if (err) {
        res.status(500).json({ error: err.message});
      } else {
        user.dinners.pop(deletedDinner);
        user.save();
        console.log('removing: ', id);
        res.status(200).send();
      }
    });
  });
});

// Auth Routes ===================================
app.post('/auth/signup', function (req, res) {
  User.findOne({ email: req.body.email }, function (err, existingUser) {
    if (existingUser) {
      return res.status(409).send({ message: 'An account is already signed up with this email'});
    }
    var user = new User({
      displayName: req.body.displayName,
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    });
    user.save(function (err, result) {
      if (err) {
        res.status(500).send({ message: err.message });
      }
      res.send({ token: auth.createJWT(result) });
    });
  });
});

app.post('/auth/login', function (req, res) {
  User.findOne({ email: req.body.email }, '+password', function (err, user) {
    if (!user) {
      return res.status(401).send({ message: 'Invalid email or password'});
    }
    user.comparePassword(req.body.password, function (err, isMatch) {
      if (!isMatch) {
        return res.status(401).send({ message: 'Invalid email or password'});
      }
      console.log('User JWT created');
      res.send({ token: auth.createJWT(user) });
    });
  });
});


// Catch all Route
app.get('/', function(req, res) {
        res.render('index');
        console.log('render index from the back server');
    });

app.get('*', function(req, res) {
        res.render('index');
        console.log('render index again');
});

// launch ==============================
app.listen(3000, function() {
  console.log('Your server has been started on LH:3000');
});



