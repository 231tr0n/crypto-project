module.exports = (request, response, next) => {
	if (request.cookies.username && request.cookies.session_id) {
		if (request.cookies.session_id != 'nill') {
			db.query('SELECT * FROM users WHERE username = ? AND session_id = ?', [request.cookies.username, request.cookies.session_id], (error, results, fields) => {
				if (error) {
					console.log(error);
					response.sendStatus(500);
					process.exit();
				} else {
					if (results.length == 1) {
						next();
					} else {
						response.sendStatus(401);
					}
				}
			});
		} else {
			response.sendStatus(401);
		}
	} else {
		response.sendStatus(401);
	}
}
