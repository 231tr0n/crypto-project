module.exports = (app) => {
	const controllers = require('./../controllers/login_system.js');
	const login_checker = require('./../middleware/login_checker.js');

	app.get('/', login_checker, (request, response) => {
		controllers.get_homepage(request, response);
	});

	app.route('/login')
		.get(login_checker, (request, response) => {
			setTimeout(controllers.get_login, 0, request, response, 0);
		})
		.post(login_checker, (request, response) => {
			setTimeout(controllers.login, 0, request, response);
		});
}
