const functions = require('./../helpers/functions.js');

let controllers = {};

controllers.get_user_home_page = (request, response, error) => {
	if (request.cookies.username) {
		response.render('userhomepage.ejs', {
			username : request.cookies.username,
			error : error,
			flag: process.env.flag
		});
	} else {
		response.sendStatus(404);
	}
}

controllers.logout = (request, response) => {
	db.query('UPDATE users SET session_id = ? WHERE username = ?', ['nill', request.cookies.username], (error, results, fields) => {
		if (error) {
			console.log(error);
			response.sendStatus(500);
			process.exit();
		} else {
			response.clearCookie('username');
			response.clearCookie('session_id');
			response.redirect('/');
		}
	});
}

module.exports = controllers;
