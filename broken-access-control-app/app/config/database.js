global.db_pool = mysql.createPool({
	connectionLimit: process.env.db_connection_pool,
	host: process.env.db_host,
	user: process.env.db_user,
	password: process.env.db_password,
	database: process.env.db_name
});

global.db_query = (query, parameters) => {
	return new Promise((resolve, reject) => {
		db_pool.query(query, parameters, (error, results, fields) => {
			if (error) {
				reject(error);
			} else {
				resolve(results);
			}
		});
	});
}

db_pool.on('error', (error) => {
	console.log(error);
	process.exit();
});
