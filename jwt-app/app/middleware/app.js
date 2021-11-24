const helpers = require('./../helpers/functions.js');

module.exports = async (request, response, next) => {
	if (request.cookies.session_id) {
		let temp = helpers.jwt_verify(request.cookies.session_id);
		if (temp) {
			const results = await db_query('SELECT * FROM users WHERE username = ?', [temp.username]);
			if (results.length == 1) {
				next();
			} else {
				response.clearCookie('session_id');
				response.sendStatus(401);
			}
		} else {
			response.clearCookie('session_id');
			response.sendStatus(401);
		}
	} else {
		response.clearCookie('session_id');
		response.sendStatus(401);
	}
}
