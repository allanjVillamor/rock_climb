const Climb = require('../models/climb');

const checkClimbOwner = async (req, res, next) => {
	if (req.isAuthenticated()) { // Check if the user is logged in
		const climb = await Climb.findById(req.params.id).exec();
	
		// If logged in, check if they own the comic
		if(climb.owner.id.equals( req.user._id)) {
			next();
		} else { // If not, redirect back to show page
			res.redirect("back");
		}
		
	} else { // If not logged in, redirect to /login
		res.redirect('/login');
	}
}

module.exports = checkClimbOwner;