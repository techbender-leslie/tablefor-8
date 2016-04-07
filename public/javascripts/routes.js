app.config(config);

config.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];

function config($stateProvider, $urlRouterProvider, $locationProvider) {
	console.log('config');

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});

	$urlRouterProvider.otherwise("/");

	$stateProvider
	.state('home', {
		url: '/',
		templateUrl: 'templates/home.html' 
	})

	.state('alldinners', {
		url: '/dinners',
		templateUrl: 'templates/dinners.html',
		controller: 'HomeController',
		controllerAs: 'index'
	})

	.state('signup', {
			url: '/signup',
			// controller: "SignupController",
			// controllerAs: 'sc',
			templateUrl: 'templates/signup.html'
			// resolve: {
			// 	skipIfLoggedIn: skipIfLoggedIn
			// }
		})

		.state('login', {
			url: '/login',
			// controller: "LoginController",
			// controllerAs: 'lc',
			templateUrl: 'templates/login.html'
			// resolve: {
			// 	skipIfLoggedIn: skipIfLoggedIn
			// }
		})

		.state('logout', {
			url: '/logout',
			template: null
			// controller: 'LogoutController'
			// resolve: {
			// 	loginRequired: loginRequired
			// }
		})

		.state('profile', {
			url: '/profile',
			templateUrl: 'templates/profile.html'
			// controller: 'ProfileController',
			// controllerAs: 'profile'
			// resolve: {
			// 	loginRequired: loginRequired
			// }
		})

		.state('about', {
			url: '/about',
			templateUrl: 'templates/about.html'
		});

}

app.service('Dinner', function($resource){
  return $resource('http://localhost:3000/api/dinners/:id', { id: '@_id' }, {
    update: {
      method: 'PUT' // this method issues a PUT request
    }
  });
});
