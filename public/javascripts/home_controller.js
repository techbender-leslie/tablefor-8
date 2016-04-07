// var app = angular.module('dinnertable', ['ui.router', 'ngResource']);

app.controller('HomeController', HomeController);

HomeController.$inject = ['Dinner'];

function HomeController(Dinner) {
	var vm = this;
	vm.homeTest = "Welcome to the homepage";
	// vm.dinners = Dinner.query();
	
	vm.dinners = Dinner.query();
	vm.dinner = {};

	vm.createDinner = function() {
		var newDinner = Dinner.save(vm.dinner);
		vm.dinner = {};
		vm.dinners.unshift(newDinner);
	};

	vm.updateDinner = function(dinner) {
		Dinner.update(dinner);
		dinner.editForm = false;
	};

	vm.deleteDinner = function(dinner) {
		console.log(dinner);
		Dinner.remove({ id: dinner._id });
		var dinnerIndex = vm.dinners.indexOf(dinner);
		vm.dinners.splice(dinnerIndex, 1);
	};
}