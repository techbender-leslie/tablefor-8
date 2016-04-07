module.exports = function(app, passport) {

	// HOME page ============================
	// app.get('/', function(req, res) {
	// 	res.render('index');
	// });


	//NOTE: Problem using hbs & html instead of ejs???
	app.get('/login', function(req, res) {
		res.render('login', { message: req.flash('loginMessage') });
	});

	// process the LOGIN FORM
	// app.post('/login', do all passport login stuff here);

	// SIGNUP ===================================

	// SHOW THE SIGNUP FORM =====================
	app.get('/signup', function(req, res) {
		res.render('signup', {message: req.flash('signupMessage')})
	});

	// process the SIGNUP FORM
	app.post('/signup', passport.authenticate('local-signup', {
		successRedirect : '/profile',
		failureRedirect : '/signup',
		failureFlash : true
	}));

	// PROFILE SECTTION ==========================
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile', {
			user : req.user // get user out session and pass to template
		});
	});

	// LOGOUT =====================================
	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();

	res.redirect('/');
}