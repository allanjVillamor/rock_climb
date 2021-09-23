// Routing file for climbs

const express = require('express');
const router = express.Router();
const Climb = require('../models/climb');
const Comment = require('../models/comment');
const isLoggedIn = require('../utils/isLoggedIn');
const checkClimbOwner = require('../utils/checkClimbOwner');


// Index
router.get("/", async (req, res) => {
	console.log(req.user);
	try {
		const climbs = await Climb.find().exec();
	res.render("climbs", {climbs});

	} catch (err) {
		console.log(err);
		res.send("you broke it... /index");
	}
})

// Create
router.post("/", isLoggedIn, async (req, res) => {
	const type = req.body.type.toLowerCase();
	const newClimb = {
		title: req.body.title,
		type,
		description: req.body.description,
		climber: req.body.climber,
		date: req.body.date,
		grade: req.body.grade,
		image: req.body.image,
		owner: {
			id: req.user._id,
			username: req.user.username
		}
	}
	try {
		const climb = await Climb.create(newClimb);
		console.log(climb);
		res.redirect("/climbs/" + climb._id);
	} catch (err) {
		console.log(err);
		res.send("You broke it... /climbs POST");
	}
	
})

// New
router.get("/new", isLoggedIn, (req, res) => {
	res.render("climbs_new");
});

// Search
router.get("/search", async (req, res) => {
	try {
		const climbs = await Climb.find( {
			$text: {
				$search: req.query.term
			}
		})
		res.render("climbs", {climbs});
	} catch (err) {
		console.log(err);
		res.send("Broken Search");
	}
})

// Show
router.get("/:id", async (req, res) => {
	try {
		const climb = await Climb.findById(req.params.id).exec();
		const comments = await Comment.find({climbId: req.params.id});	
		res.render("climbs_show", {climb, comments})
	} catch (err) {
		console.log(err);
		res.send("You broke it... /climbs/:id")
	}
	
	
});

// Edit
router.get("/:id/edit", checkClimbOwner, async (req, res) => {
	
		const climb = await Climb.findById(req.params.id).exec();
		res.render("climbs_edit", {climb});
})

// Update
router.put("/:id", checkClimbOwner, async (req, res) => {
	const type = req.body.type.toLowerCase();
	const climbBody = {
		title: req.body.title,
		type,
		description: req.body.description,
		climber: req.body.climber,
		date: req.body.date,
		grade: req.body.grade,
		image: req.body.image
	}
	
	try {
		const climb = await Climb.findByIdAndUpdate(req.params.id, climbBody, {new: true}).exec();
		res.redirect(`/climbs/${req.params.id}`);
	} catch (err) {
		console.log(err);
		res.send("Broken again... /climbs/id PUT");
	}
	
})

// Delete
router.delete("/:id", checkClimbOwner, async (req, res) => {
	try {
		const deletedClimb = await Climb.findByIdAndDelete(req.params.id).exec();
		console.log("Deleted:", deletedClimb);
		res.redirect("/climbs");
	} catch (err) {
		console.log(err);
		res.send("Broken /climbs/id DELETE");
	}
});


module.exports = router;