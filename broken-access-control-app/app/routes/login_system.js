const controllers = require('./../controllers/login_system.js');
const middleware = require('./../middleware/login_system.js');
const express = require('express');
const router = express.Router();

router.get('/', middleware, controllers.get_home);
router.get('/login', middleware, controllers.get_login);
router.get('/signup', middleware, controllers.get_signup);
router.post('/login', middleware, async (request, response) => {
	setTimeout(controllers.login, delay_request, request, response);
});
router.post('/signup', middleware, async (request, response) => {
	setTimeout(controllers.signup, delay_request, request, response);
});

module.exports = router;
