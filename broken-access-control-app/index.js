require('dotenv').config();

const express = require('express');
global.path = require('path');
const cp = require('cookie-parser');
global.fs = require('fs');
const bp = require('body-parser');
const favicon = require('serve-favicon');
global.osc = require('child_process');
global.formidable = require('formidable');
global.progress = require('progress');
global.axios = require('axios');
const http = require('http');

let app = express();
let express_server = http.createServer(app);

app.disable('x-powered-by');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(bp.urlencoded({
	extended : true
}));

app.use(bp.json());

app.use(cp());

require('./config/db_config.js');

app.use('/', express.static(path.join(__dirname, 'public')));

let port = 8080;

global.__basedir = __dirname;
global.__userdir = path.join(__dirname, 'users');
global.__tempdir = path.join(__dirname, 'temp');
global.session_id_length = 10;
global.csrf_length = 10;
global.username_length = 100;
global.password_length = 100;
global.email_length = 100;
global.delay_request = 1000;
global.minimum_password_length = 6;
global.minimum_username_length = 1;
global.user_data_size_gb = 1;
global.max_file_size_gb = 0.9;
global.email_server_url = process.env.email_server_url;
global.default_username = process.env.default_username;
global.default_email = process.env.default_email;
global.default_password = process.env.default_password;

require('./models/users_login.js');

require('./routes/login_system.js')(app);
require('./routes/app.js')(app);

app.all('*', (request, response) => {
	response.sendStatus(404);
});

express_server.listen(port, (error) => {
	if (error) {
		console.log('Port' + port.toString() + ' not idle!');
		process.exit();
	} else {
		console.log('Listening at port: ' + port.toString());
	}
});

process.on('SIGINT', () => {
	console.log();
	console.log('SIGINT signal received. Closing the server.');
	express_server.close(() => {
		console.log("Server Closed");
		db.end((error) => {
			if (error) {
				console.log(error);
			} else {
				console.log('Closed connection to mysql.');
				process.exit();
			}
		});
	});
});
