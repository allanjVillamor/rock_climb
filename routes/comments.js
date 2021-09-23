// Routing file for comments

const express = require('express');
const router = express.Router({mergeParams: true});
const Comment = require('../models/comment');
const Climb = require('../models/climb');
const isLoggedIn = require('../utils/isLoggedIn');
const checkCommentOwner = require('../utils/checkCommentOwner');

// New Comment - Show Form
router.get("/new", isLoggedIn, (req, res) => {
	res.render("comments_new", {climbId: req.params.id})
})


// Create Comment - Update DB
router.post("/", isLoggedIn, async (req, res) => {
	try {
		// Create Comment
	const comment = await Comment.create({
		user: {
			id: req.user._id,
			username: req.user.username
		},
		text: req.body.text,
		climbId: req.body.climbId
	});
	console.log(comment);
	res.redirect(`/climbs/${req.body.climbId}`);
	
	} catch (err) {
		console.log(err);
		res.send("Broken again... POST comments");
	}
})

// EDIT Comment - Show the edit form
router.get("/:commentId/edit", checkCommentOwner, async (req, res) => {
	try {
		const climb = await Climb.findById(req.params.id).exec();
		const comment = await Comment.findById(req.params.commentId).exec();
		console.log("climb:", climb);
		console.log("comment:", comment)
		res.render("comments_edit", {climb, comment});
	} catch (err) {
		console.log(err);
		res.send("Broke Comment Edit GET")
	}
})


// Update Comment - Update in DB
router.put("/:commentId", checkCommentOwner, async (req, res) => {
	try {
		const comment = await Comment.findByIdAndUpdate(req.params.commentId, {text: req.body.text}, {new: true});
		console.log(comment);
		res.redirect(`/climbs/${req.params.id}`);
	} catch(err) {
		console.log(err);
		res.send("Broke comment PUT")
	}
})
// Delete Comment
router.delete("/:commentId", checkCommentOwner, async (req, res) => {
	try {
		const comment = await Comment.findByIdAndDelete(req.params.commentId);
		console.log(comment);
		res.redirect(`/climbs/${req.params.id}`);
	} catch (err) {
		console.log(err);
		res.send("Broken again comment DELETE");
	}
});

	
module.exports = router;