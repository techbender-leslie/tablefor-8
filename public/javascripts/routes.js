// app.config(config);


// // app.controller('HomeController', HomeController);
// // app.controller('LoginCtrl', LoginCtrl);
// // app.controller('SignupCtrl', SignupCtrl);


// config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

// function config($stateProvider, $urlRouterProvider, $locationProvider) {
// 	console.log('config');

// 	$locationProvider.html5Mode({
// 		enabled: true,
// 		requireBase: false
// 	});

// 	$urlRouterProvider.otherwise("/");

// 	$stateProvider
// 	.state('home', {
// 		url: '/',
// 		templateUrl: 'templates/home.html' 
// 	})

// 	.state('alldinners', {
// 		url: '/dinners',
// 		templateUrl: 'templates/dinners.html',
// 		controller: 'HomeController', 
// 		controllerAs: 'index'
// 	})

// 	.state('signup', {
// 			url: '/sminenup',
// 			controller: "SignupCtrl",
// 			controllerAs: 'sc',
// 			templateUrl: 'templates/signup.html'
// 			// resolve: {
// 			// 	skipIfLoggedIn: skipIfLoggedIn
// 			// }
// 		})

// 		.state('login', {
// 			url: '/smogin',
// 			controller: "LoginCtrl",
// 			controllerAs: 'lc',
// 			templateUrl: 'templates/login.html'
// 			// resolve: {
// 			// 	skipIfLoggedIn: skipIfLoggedIn
// 			// }
// 		})

// 		.state('logout', {
// 			url: '/smogout',
// 			template: null
// 			// controller: 'LogoutController'
// 			// resolve: {
// 			// 	loginRequired: loginRequired
// 			// }
// 		})

// 		.state('profile', {
// 			url: '/ppppprofile',
// 			templateUrl: 'templates/profile.html'
// 			// controller: 'ProfileController',
// 			// controllerAs: 'profile'
// 			// resolve: {
// 			// 	loginRequired: loginRequired
// 			// }
// 		})

// 		.state('about', {
// 			url: '/yabout',
// 			templateUrl: 'templates/about.html'
// 		});

// }

// app.service('Dinner', function($resource){
//   return $resource('http://localhost:3000/api/dinners/:id', { id: '@_id' }, {
//     update: {
//       method: 'PUT' // this method issues a PUT request
//     }
//   });
// });
