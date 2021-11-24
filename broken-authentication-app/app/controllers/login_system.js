const functions = require('./../helpers/functions.js');

let controllers = {};

controllers.get_homepage = (request, response) => {
	response.render('homepage.ejs');
}

controllers.get_login = (request, response, error) => {
	response.render('loginpage.ejs', {
		username_length : username_length,
		password_length : password_length,
		minimum_password_length : minimum_password_length,
		minimum_username_length : minimum_username_length,
		error : error
	});
}

controllers.login = (request, response) => {
	if (request.body.username && request.body.password) {
		db.query('SELECT * FROM users WHERE username = ?', [request.body.username], (error, results, fields) => {
			if (error) {
				console.log(error);
				response.sendStatus(500);
				process.exit();
			} else {
				if (results.length == 1) {
					if (results[0].password == request.body.password) {
						let temp_session_id = functions.random_string_generator(session_id_length);
						response.cookie('username', request.body.username, {
							httpOnly: true,
							sameSite: true
						});
						response.cookie('session_id', temp_session_id, {
							httpOnly: true,
							sameSite: true
						});
						db.query('UPDATE users SET session_id = ? WHERE username = ?', [temp_session_id, request.body.username], (error, results, fields) => {
							if (error) {
								console.log(error);
								response.sendStatus(500);
								process.exit();
							} else {
								response.redirect('/home');
							}
						});
					} else {
						controllers.get_login(request, response, 2);
					}
				} else {
					controllers.get_login(request, response, 1);
				}
			}
		});
	} else {
		response.sendStatus(400);
	}
}

module.exports = controllers;
