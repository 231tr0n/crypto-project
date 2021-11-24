db.query('CREATE TABLE IF NOT EXISTS users (id INT AUTO_INCREMENT PRIMARY KEY, username VARCHAR(?) NOT NULL, password VARCHAR(?) NOT NULL, email VARCHAR(?) NOT NULL, session_id VARCHAR(?) NOT NULL)', [username_length, password_length, email_length, session_id_length], (error, results, fields) => {
	if (error) {
		console.log(error);
		process.exit();
	} else {
		db.query('SELECT * FROM users WHERE username = ? AND password = ? AND email = ?', [process.env.default_username, process.env.default_password, process.env.default_email], (error, results, fields) => {
			if (error) {
				console.log(error);
				process.exit();
			} else {
				if (results.length == 1) {
					console.log('Default username entry already exists');
				} else {
					console.log('Default username entry not found');
					db.query('INSERT INTO users (username, password, email, session_id) VALUES (?, ?, ?, ?)', [process.env.default_username, process.env.default_password, process.env.default_email, 'nill'], (error, results, fields) => {
						if (error) {
							console.log(error);
							process.exit();
						} else {
							console.log('Created default username entry in the table');
						}
					});
				}
			}
		});
	}
});
