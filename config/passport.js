// load everything needed
var LocalStrategy = require('passport-local').Strategy;

// load the user
var User = require('../app/models/user');

// expose this function to our app using module.exports
module.exports = function(passport) {

// passport session setup ==========================
// required for persistent login sessions
// passport needs ability to serialize and unserialize users out of session

// used to serialize the user for the session
passport.serializeUser(function(user, done) {
	done(null, user.id);
});

// used to deserialize the user
passport.deserializeUser(function(id, done) {
	User.findById(id, function(err, user) {
		done(err, user);
	});
});

// LOCAL SIGNUP =====================================
// Use the Local prefix if other Auth going to be used

passport.use('local-signup', new LocalStrategy({
	// by default local strategy uses username and password, 
	// but will override with email
	usernameField : 'email',
	passwordField : 'password',
	passReqToCallback : true // allows pass back the entire request to the callback
},

function(req, email, password, done) {
	// asynhronous
	// User.findOne willnot fire unless data is sent back
	process.nextTick(function() {

		// find a user that has same email as form
		// checking to see if user is trying to login in already exists
		User.findOne({ 'local.email' : email }, function(err, user) {
			if (err)
				return done(err);

			if (user) {
				return done(null, false, req.flash('signupMessage', 'That email is already taken'));
			} else {
				// if email not in use, make new user
				var newUser = new User();
				
				// set the user's local credentials
				newUser.local.email = email;
				newUser.local.password = newUser.generateHash(password);

				// save the user
				newUser.save(function(err) {
					if (err)
						throw err;
					return done(null, newuser);
				});
			}
		});
	});
}));
};