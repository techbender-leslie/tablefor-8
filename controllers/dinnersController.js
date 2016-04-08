// var Dinner = require('../app/models/dinner');

// var dinnersController = {
// 	index: function(req, res) {
// 		Dinner.find({}, function(err, dinners) {
// 			res.status(200).send(JSON.stringify(dinners.reverse()));
// 		});
// 	},

// 	create: function(req, res) {
// 		console.log(req.body)
// 			var dinername = req.body.dinnername;
// 			var image = req.body.image;
// 			var cuisinetype = req.body.cuisinetype;
// 			var drinks =req.body.drinks;
// 			var where = req.body.where;
// 			var capacity = req.body.capacity;
// 			var calendar = req.body.calendar;
// 			var time = req.body.time;
// 			var dishes = req.body.dishes;
// 			var hostedby = req.body.hostedby;
// 			var guests = req.body.guests;
// 			var notes = req.body.guests;

// 			Dinner.create({dinnername: dinnername, image: image, cuisinetype: cuisinetype, drinks: drinks, where: where, capacity: capacity, calendar: calendar, time: time, dishes: dishes, hostedby: hostedby, guests: guests, notes: notes}, function(err, dinner) {
// 				console.log('error from create', err);
// 			});
// 	},

// 	destroy: function(req, res) {
// 		Dinner.remove({_id: req.params.id}, function(err, dinner) {
// 			console.log(dinner);
// 			err ?
// 				res.status(500).send() :
// 				res.status(204).send(JSON.stringify(dinner));
// 		});
// 	}
// };

// module.exports = dinnersController;