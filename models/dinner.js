var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

	// Dish = require('./dish');
	// Guest = require('./guest');
	User = require('./user');

var dinnerSchema = new Schema({
	// host: { type: Schema.Types.ObjectId, ref: 'User'},
	dinnername : {type : String, default: ''},
	image: {type: String, default: ''},
	cuisinetype: {type : String, default: ''},
	// dishes: [{ type: Schema.Types.ObjectId, ref: 'Dish'}],
	dishes: [],
	drinks: [{type: String, default: ''}],
	where: {type: String, default: ''},
	capacity: {type: Number, default: ''},
	calendar: {type: Date, default: ''},
	time: {type: String, default: ''},
	hostedby: {type: String, default: ''},
	description: {type: String, default: ''},
	// guests: [{ type: Schema.Types.ObjectId, ref: 'User'}],
	guests: [User],
	notes: {type: String, default: ''}
});


module.exports = mongoose.model('Dinner', dinnerSchema);
