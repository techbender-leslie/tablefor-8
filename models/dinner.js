var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

	// // Dish = require('./dish');
	// Guest = require('./guest');
	// User = require('./user');

var guestSchema = new Schema({ 
	guestname: { type: String},
	bringing: {type: String},
	contactemail: {type: String}
	// email: { type: String, lowercase: true }, // find a way to link to current user at signup
	// picture: String, // find a way to link to current user at signup
})

var dinnerSchema = new Schema({
	host: { type: Schema.Types.ObjectId, ref: 'User'}, //find way to linke to person who makes event
	dinnername : {type : String, default: ''},
	image: {type: String, default: ''},
	cuisinetype: {type : String, default: ''},
	dishes: [],
	drinks: [{type: String, default: ''}],
	where: {type: String, default: ''},
	capacity: {type: Number, default: ''},
	calendar: {type: Date, default: ''},
	time: {type: String, default: ''},
	hostedby: {type: String, default: ''},
	contactemail: {type: String, default: ''},
	description: {type: String, default: ''},
	//guests: [{ type: Schema.Types.ObjectId, ref: 'Guest'}], 
	guests: [guestSchema],
	notes: {type: String, default: ''}
});

var Dinner = mongoose.model('Dinner', dinnerSchema);
var Guest = mongoose.model('Guest', guestSchema);

module.exports = Dinner;
