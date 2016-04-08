angular
	.module('dinnerTable', [
		'ui.router', 
		// 'ngResource' - use factory then instead of service
		'satellizer'
	])
	.controller('MainController', MainController)
	.controller('IndexController', IndexController)
	.controller('ShowDinnerController', ShowDinnerController)
	.controller('LoginController', LoginController)
	.controller('SignupController', SignupController)
	.controller('LogoutController', LogoutController)
	.controller('ProfileController', ProfileController)
	.service('Account', Account)
	.config(configRoutes)
	;


// ROUTES =========================================

	configRoutes.$inject = ['$stateProvider', '$urlRouterProvider', '$locationProvider'];
	function configRoutes($stateProvider, $urlRouterProvider, $locationProvider) {

		$locationProvider.html5Mode({
			enabled: true,
			requireBase: false
		});

		$urlRouterProvider.otherwise("/");

		$stateProvider
			// .state('home', {
	  //     url: '/',
	  //     templateUrl: 'templates/home.html',
	  //     controller: 'HomeController',
	  //     controllerAs: 'home'
	  //   })

	     .state('home', { // this is just a splash page
				url: '/', 
				templateUrl: 'templates/home.html' 
			})

	     .state('about', {
				url: '/yabout',
				templateUrl: 'templates/about.html'
			})

	    .state('alldinners', { // this is really home
				url: '/dinners',
				templateUrl: 'templates/dinners.html',
				controller: 'IndexController', 
				controllerAs: 'index'
			})

			.state('showdinner', {
				url: '/dinners/:id',
				templateUrl: 'templates/dinner-show.html',
				controller: 'ShowDinnerController',
				controllerAs: 'show'
			})

	    .state('signup', {
	      url: '/signup',
	      templateUrl: 'templates/signup.html',
	      controller: 'SignupController',
	      controllerAs: 'sc',
	      resolve: {
	        skipIfLoggedIn: skipIfLoggedIn
	      }
	    })

	    .state('login', {
	      url: '/login',
	      templateUrl: 'templates/login.html',
	      controller: 'LoginController',
	      controllerAs: 'lc',
	      resolve: {
	        skipIfLoggedIn: skipIfLoggedIn
	      }
	    })

	    .state('logout', {
	      url: '/logout',
	      template: null,
	      controller: 'LogoutController',
	      resolve: {
	        loginRequired: loginRequired
	      }
	    })

	    .state('profile', {
	      url: '/profile',
	      templateUrl: 'templates/profile.html',
	      controller: 'ProfileController',
	      controllerAs: 'profile',
	      resolve: {
	        loginRequired: loginRequired
	      }
	    })


// Special Helper Functions FOR LOGIN ============================

    function skipIfLoggedIn($q, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.reject();
      } else {
        deferred.resolve();
      }
      return deferred.promise;
    }

    function loginRequired($q, $location, $auth) {
      var deferred = $q.defer();
      if ($auth.isAuthenticated()) {
        deferred.resolve();
      } else {
        $location.path('/login');
      }
      return deferred.promise;
    }
}

// CONTROLLERS =================================

    MainController.$inject = ["Account"];
    	function MainController (Account) {
    		var vm = this;

    		vm.currentUser = function() {
    			return Account.currentUser();
    		};
    	}

    IndexController.$inject = ["$http"];
    	function IndexController ($http) {
    		var vm = this;
    		vm.dinners = [];
    		vm.new_dinner = {};

    		$http.get('/api/dinners')
    			.then( function (response) {
    				vm.dinners = response.data;
    			});

    		vm.createDinner = function() {
    			$http.post('/api/dinners', vm.new_dinner)
    				.then(function (response) {
    					vm.new_dinner = {};
    					vm.dinners.push(response.data);
    					});
    				};

    		vm.deleteDinner = function(dinner) {
    			$http.delete("/api/dinners/" + dinner._id)
    				.then(function(response) {
    					var dinnerIndex = vm.dinners.indexOf(dinner);
    					vm.dinners.splice(dinnerIndex, 1);
    				});
				};
    	}


    ShowDinnerController.$inject = ["$http"];
	    function ShowDinnerController ($http) {
	    	return $http.get('/api/dinners/:id')
	    	}
   


    LoginController.$inject = ["$location", "Account"];
    	function LoginController ($location, Account) {
    		var vm = this;
    		vm.new_user = {};

    		vm.login = function() {
    			Account
    				.login(vm.new_user)
    				.then(function(){
    					vm.new_user = {};
    					$location.path('/profile');
    				})
    		};
    	}

    SignupController.$inject = ["$location", "Account"];
    	function SignupController ($location, Account) {
    		var vm = this;
    		vm.new_user = {};

    		vm.signup = function() {
    			Account
    			.signup(vm.new_user)
    			.then(
    				function (response) {
    					vm.new_user = {};
    					$location.path('/profile');
    				}
    			);
    		};
    	}

    LogoutController.$inject = ["$location", "Account"];
    	function LogoutController ($location, Account) {
    		Account
    		.logout()
    		.then( 
    			function() {
    			$location.path('/login');
    		});
    	}

    ProfileController.$inject = ["Account"];
    	function ProfileController (Account) {
    		var vm = this;
    		vm.new_profile = {};

    		vm.updateProfile = function() {
    			Account
    			.updateProfile(vm.new_profile)
    			.then(function () {
    				vm.showEditForm = false;
    			});
    		};
    	}


// SERVICES ==================================
	Account.$inject = ["$http", "$q", "$auth"];
		function Account($http, $q, $auth) {
			var self = this;
			self.user = null;

			self.signup = signup;
			self.login = login;
			self.logout = logout;
			self.currentUser = currentUser;
			self.getProfile = getProfile;
			self.updateProfile = updateProfile;

			function signup(userData) {
				return (
					$auth
						.signup(userData)
						.then(
							function onSuccess(response) {
								$auth.setToken(response.data.token);
							},

							function onError(error) {
								console.log(error);
							}
						)
					);
			}

			function login(userData) {
				return (
					$auth
						.login(userData)
						.then(
							function onSuccess(response) {
								$auth.setToken(response.data.token);
							},

							function onError(error) {
								console.error(error);
								}
							)
						);
				}
	
			function logout() {
				return (
					$auth
					.logout()
					.then(function() {
						self.user = null;
					})
				);
			}

			function currentUser() {
				if ( self.user ) { return self.user; }
				if ( !$auth.isAuthenticated() ) { return null; }

				var deferred = $q.defer();
				getProfile().then(
					function onSuccess(response) {
						self.user = response.data;
						deferred.resolve(self.user);
					},

					function onError() {
						$auth.logout();
						self.user = null;
						deferred.reject();
					}
				)
				self.user = promise = deferred.promise;
				return promise;
			}

			function getProfile() {
				return $http.get('/api/me');
			}


				function updateProfile(profileData) {
					return (
						$http
						.put('/api/me', profileData)
						.then(
							function (response) {
								self.user = response.data;
							}
						)
					)
		}
}









