db_query('CREATE TABLE IF NOT EXISTS users (username VARCHAR(?) NOT NULL, password VARCHAR(?) NOT NULL)', [max_username_length, max_password_length]).then((results) => {
	console.log('Created table if not exists users.');
}).catch((error) => {
	console.log(error);
	process.exit();
});
