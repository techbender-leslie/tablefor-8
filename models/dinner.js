var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

	// Dish = require('./dish');
	// Guest = require('./guest');

var DinnerSchema = new Schema({
	dinnername : {type : String, default: ''},
	image: {type: String, default: ''},
	cuisinetype: {type : String, default: ''},
	// dishes: [{ type: Schema.Types.ObjectId, ref: 'Dish'}],
	drinks: [{type: String, default: ''}],
	where: {type: String, default: ''},
	capacity: {type: Number, min: 4, max: 10, default: ''},
	calendar: {type: Date, default: ''},
	time: {type: String, default: ''},
	hostedby: {type: String, default: ''},
	description: {type: String, default: ''},
	// guests: [{ type: Schema.Types.ObjectId, ref: 'Guest'}],
	notes: {type: String, default: ''}
});


DinnerSchema.statics.all = function all(cb) {
	return
		this.model.find({})
		.catch(function(err) {
			console.log(err);
		})
		.then(function(dinners) {
			cb(dinners);
		})
		;
};

var Dinner = mongoose.model('Dinner', DinnerSchema);
module.exports = Dinner;
