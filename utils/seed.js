const Climb = require('../models/climb');
const Comment = require('../models/comment');


const climb_seeds = [
	{
	
	}
]
const seed = async () => {
	// Delete all current climbs and comments
	await Climb.deleteMany();
	console.log("Deleted All the Climbs")
	
	await Comment.deleteMany();
	console.log("Deleted All the Comments!")
	
	// // Create three new climbs
	// for(const climb_seed of climb_seeds) {
	// 	let climb = await Climb.create(climb_seed);
	// 	console.log("Created a new climb:", climb.title)
	// 	// Create a new comment for each climb
	// 	await Climb.create({
	// 		text: "I ruved this Romic Rook",
	// 		user: "scooby_doo",
	// 		climbId: climb._id
	// 	})
	// 	console.log("Created a new comment!")
	// }
}

module.exports = seed;