const mongoose = require("mongoose");

const climbSchema = new mongoose.Schema({
	title: String,
	type: String,
	description: String,
	climber: String,
	date: Date,
	grade: String,
	image: String,
	owner: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	}
});

climbSchema.index({
	'$**': 'text'
});

module.exports = mongoose.model("climb", climbSchema);