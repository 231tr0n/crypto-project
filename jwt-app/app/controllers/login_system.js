const helpers = require('./../helpers/functions.js');
const controllers = {};

controllers.get_home = async (request, response) => {
	response.render('homepage.ejs');
}

controllers.get_login = async (request, response) => {
	response.render('loginpage.ejs', {
		max_username_length: max_username_length,
		max_password_length: max_password_length,
		error: false
	});
}

controllers.get_signup = async (request, response) => {
	response.render('signuppage.ejs', {
		max_username_length: max_username_length,
		max_password_length: max_password_length,
		error: 0
	});
}

controllers.login = async (request, response) => {
	if (request.body.username && request.body.password) {
		const results = await db_query('SELECT * FROM users WHERE username = ? and password = ?', [request.body.username, request.body.password]);
		if (results.length == 1) {
			let temp = {
				username: request.body.username
			};
			let token = helpers.jwt_sign(temp);
			response.cookie('session_id', token, {
				httpOnly: true,
				sameSite: true,
			});
			response.redirect('/home');
		} else {
			response.render('loginpage.ejs', {
				max_username_length: max_username_length,
				max_password_length: max_password_length,
				error: true
			});
		}
	} else {
		response.sendStatus(400);
	}
}

controllers.signup = async (request, response) => {
	if (request.body.username && request.body.password && request.body.check_password) {
		if (request.body.username.length < max_username_length && request.body.password.length < max_password_length) {
			const results = await db_query('SELECT * FROM users WHERE username = ?', [request.body.username]);
			if (results.length == 1) {
				response.render('signuppage.ejs', {
					max_username_length: max_username_length,
					max_password_length: max_password_length,
					error: 1
				});
			} else {
				await db_query('INSERT INTO users (username, password) VALUES (?, ?)', [request.body.username, request.body.password]);
				response.redirect('/login');
			}
		} else {
			response.sendStatus(401);
		}
	} else {
		response.sendStatus(400);
	}
}

module.exports = controllers;
