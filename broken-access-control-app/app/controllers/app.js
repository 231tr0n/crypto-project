const controllers = {};
const helpers = require('./../helpers/functions.js');

controllers.get_user_home = async (request, response) => {
	let temp = helpers.jwt_verify(request.cookies.session_id);
	response.render('userhomepage.ejs', {
		username: temp.username
	});
}

controllers.logout = async (request, response) => {
	if (request.cookies.session_id) {
		response.clearCookie('session_id');
		response.redirect('/');
	} else {
		response.sendStatus(400);
	}
}

module.exports = controllers;
