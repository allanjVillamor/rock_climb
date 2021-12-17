const isLoggedIn = (req, res, next) => {
	if (req.isAuthenticated()) {
		return next();
	} else {
		req.flash("error", "Must be logged in");
		res.redirect('/login');
	}
};

module.exports = isLoggedIn;