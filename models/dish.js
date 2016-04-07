var mongoose = require("mongoose"),
  Schema = mongoose.Schema;

// var Dinner = require('./dinner');

var DishSchema = new Schema({
	dish_name: String,
	image: String,
	dish_type: String,
	ingredients: [String],
	directions: String
});
