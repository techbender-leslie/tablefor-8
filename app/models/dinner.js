var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

	// Dish = require('./dish');
	// Guest = require('./guest');

var dinnerSchema = new Schema({
	dinnername : {type : String, default: ''},
	image: {type: String, default: ''},
	cuisinetype: {type : String, default: ''},
	// dishes: [{ type: Schema.Types.ObjectId, ref: 'Dish'}],
	drinks: [{type: String, default: ''}],
	where: {type: String, default: ''},
	capacity: {type: Number, default: ''},
	calendar: {type: Date, default: ''},
	time: {type: String, default: ''},
	hostedby: {type: String, default: ''},
	description: {type: String, default: ''},
	// guests: [{ type: Schema.Types.ObjectId, ref: 'Guest'}],
	notes: {type: String, default: ''}
});


// dinnerSchema.statics.all = function all(cb) {
// 	return
// 		this.model.find({})
// 		.catch(function(err) {
// 			console.log(err);
// 		})
// 		.then(function(dinners) {
// 			cb(dinners);
// 		})
// 		;
// };

// var Dinner = mongoose.model('Dinner', dinnerSchema);
// module.exports = Dinner;

module.exports = mongoose.model('Dinner', dinnerSchema);
