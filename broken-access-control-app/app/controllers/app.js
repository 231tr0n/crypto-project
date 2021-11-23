const controllers = {};

controllers.get_user_home = async (request, response) => {
	response.render('userhomepage.ejs', {
		username: request.signedCookies.session_id
	});
}

controllers.logout = async (request, response) => {
	if (request.signedCookies.session_id) {
		response.clearCookie('session_id');
		response.redirect('/');
	} else {
		response.sendStatus(400);
	}
}

module.exports = controllers;
