const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
	user: {
		id: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User"
		},
		username: String
	},
	text: String,
	climbId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Climb"
	}
});


module.exports = mongoose.model("comment", commentSchema);