module.exports = async (request, response, next) => {
	if (request.signedCookies.session_id) {
		const results = await db_query('SELECT * FROM users WHERE username = ?', [request.signedCookies.session_id]);
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
}
