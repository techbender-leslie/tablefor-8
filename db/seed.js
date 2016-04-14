// this file allows me to seed my app
// run 'node seed.js' to seed

var mongoose = require('mongoose'),
	// conn= mongoose.connect(
	// 	process.env.MONGOLAB_URI ||
	// 	process.env.MONGOHQ_URL ||
	// 	"mongodb://localhost/charliestable"
	// 	),
		Dinner = require("../models/dinner");

		Dinner.remove({}, function(err) {
			if (err) {return console.log('Error', err); }
		});

var dinners = [
	{
	dinnername: "Spring Tuscan Dinner Al Fresco",
	image: "http://peggymarkel.com/wp-content/uploads/2014/10/tuscan-feast-709x532.png",
	cuisinetype: "Italian",
	dishes: ["fava al ovo", "capezzana cake", "heirloom polenta with pumpkin", "pasta al fresco", "asparagus risotto", "sweet potato gnocchi", "tiramisu"],
	drinks: ["vino della casa- white and red", "tuscan mules", "sparkling water"],
	where: "San Francisco, CA",
	capacity: 8,
	calendar: "04/16/2016",
	time: "6:00pm",
	hostedby: "Leslie",
	contactemail: "leslie@gmail.com",
	guests: [{guestname: "Leslie G.", bringing: "capezzanna cake, vino della casa", contactemail: "leslie@gmail.com"}, {guestname: "Thom W.", bringing: "asparagus risotto", contactemail: "thom@gmail.com"}, {guestname: "Clarisa P.", bringing: "sweet potato gnocchi", contactemail: "clarisa@gmail.com"}],
	notes: "I am really looking forward to this meal, it will be the first al fresco dinner party of the year for me. Some recommended recipes can be found: http://www.tuscanrecipes.com/ and http://www.artofcookery.com/. Inbox me if you have any questions."
},
{
	dinnername: "Mediterranean Vegetarian Feast",
	image: "http://www.layalinaedmonton.com/wp-content/uploads/2012/10/menu650.jpg",
	cuisinetype: "Mediterranean",
	dishes: ["Falafel", "Hummus", "Greek Salad", "Tabouli", "Baba Ganoush", "Mixed Veggie Kabobs", "Vegetarian Grape Leaves", "Fresh Pita", "Pistachio Baklava"],
	drinks: ["Sparkling Water", "Red Wine", "White Wine", "Turkish Coffee"],
	where: "Oakland, CA",
	capacity: 6,
	calendar: "2016-04-09T07:00:00.000Z",
	time: "7:00 pm",
	hostedby: "Cassia",
	contactemail: "cassia@gmail.com",
	guests: [{guestname: "Cassia B.", bringing: "veggie Kabobs, wine, baklava", contactemail: "cassia@gmail.com"}, {guestname: "Vix A.", bringing: "hummus and pita", contactemail: "vix@gmail.com"}, {guestname: "Brooklyn", bringing: "Greek salad and sparkling water", contactemail: "brooklyn@gmail.com"}, {guestname: "Michael J.", bringing: "more wine and tabouli", contactemail: 'michaelw@gmail.com'}, {guestname: "Leslie G.", bringing: "Falafel and fresh pita", contactemail: "leslie@gmail.com"}, {guestname: "Lelaforra", bringing: "baba ganoush and wine", contactemail: "lelaf@gmail.com"}],
	notes: "This includes some of my favorite foods. A great resource for most recipes can be found on my friend's website: www.dedemed.com. Also, I will be playing a great assortment of music from the Middle East and Mediterranean areas and keeping the lighting very low tonight. We can choose to eat Turkish style around a low communal table on pillows or at the dining table."} 
];

Dinner.create(dinners, function(err, dinners) {
	if(err) {
		console.log('Error: ', err);
	} else {
		console.log("created: ", dinners);
		mongoose.connection.close();
	}
});

