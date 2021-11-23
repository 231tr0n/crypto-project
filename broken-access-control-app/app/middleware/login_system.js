const helpers = require('./../helpers/functions.js');

module.exports = async (request, response, next) => {
	if (request.cookies.session_id) {
		let temp = helpers.jwt_verify(request.cookies.session_id);
		if (temp) {
			const results = await db_query('SELECT * FROM users WHERE username = ?', [temp.username]);
			if (results.length == 1) {
				response.redirect('/home');
			} else {
				response.clearCookie('session_id');
				next();
			}
		} else {
			response.clearCookie('session_id');
			next();
		}
	} else {
		response.clearCookie('session_id');
		next();
	}
}
