module.exports = (app) => {
	const controllers = require('./../controllers/app.js');
	const authenticator = require('./../middleware/authenticator.js');

	app.get('/home', authenticator, (request, response) => {
		controllers.get_user_home_page(request, response, 0);
	});

	app.get('/control_panel', authenticator, (request, response) => {
		controllers.get_control_panel(request, response);
	});

	app.post('/logout', authenticator, (request, response) => {
		controllers.logout(request, response);
	});
}
