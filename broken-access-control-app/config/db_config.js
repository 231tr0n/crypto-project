const mysql = require('mariadb/callback');

global.db = mysql.createConnection({
	host : process.env.db_host,
	user : process.env.db_user,
	password : process.env.db_password,
	database: process.env.db_name
});

db.connect((error) => {
	if (error) {
		console.log('Database Connection failed.');
		process.exit();
	} else {
		console.log('Connected to Database.');
	}
});

db.on('error', (error) => {
	if (error.code === 'PROTOCOL_CONNECTION_LOST') {
		db.destroy();
		console.log(error);
		process.exit();
	} else {
		db.destroy();
		console.log(error);
		process.exit();
	}
});
