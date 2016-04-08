// var mongoose = require('mongoose'),
// 	Schema = mongoose.Schema;
// //bcrypt = require('bcryptjs');

// var guestSchema = new Schema({
// 	created: {type: Date},
// 	updated: {type: Date},
// 	name: String,
// 	email: { type: String, unique: true, lowercase: true},
// 	password: {type: String, select: false},
// 	phone: String,
// 	picture: String,
// 	city: String,
// 	profession: String,
// 	age_group: String,
// 	favorite_food: [String],
// 	favorite_music: [String],
// 	favorite_media: [String],
// 	twitter: String,
// 	facebook: String,
// 	linkedin: String
// });

// guestSchema.pre('save', function (next) {
// 	now = new Date();
// 	this.updated = now;
// 	if(!this.created) {
// 		this.created = now;
// 	}
// });