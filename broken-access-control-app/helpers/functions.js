let functions = {}

functions.random_string_generator = (length) => {
	let characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	let random_string = '';
	for (let i = 0; i < length; i ++) {
		random_string += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return random_string;
}

functions.password_tester = (password) => {
	if (password.length >= minimum_password_length && password.length < password_length) {
		let check = false;
		let check_1 = false;
		let check_2 = false;
		let i = 0;
		for (i = 0; i < password.length; i ++) {
			if (48 <=  password.charCodeAt(i) && password.charCodeAt(i) <= 57) {
				check = true;
			} else if (65 <= password.charCodeAt(i) && password.charCodeAt(i) <= 90) {
				check_1 = true;
			} else if (97 <= password.charCodeAt(i) && password.charCodeAt(i) <= 122) {
				check_2 = true;
			} else {
				return false;
			}
		}
		if (check && check_1 && check_2) {
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
}

functions.username_tester = (username) => {
	if (username.length >= minimum_username_length && username.length < username_length) {
		let i = 0;
		for (i = 0; i < username.length; i ++) {
			if (48 <= username.charCodeAt(i) && username.charCodeAt(i) <= 57) {
				continue;
			} else if (65 <= username.charCodeAt(i) && username.charCodeAt(i) <= 90) {
				continue;
			} else if (97 <= username.charCodeAt(i) && username.charCodeAt(i) <= 122) {
				continue;
			} else {
				return false;
			}
		}
		return true;
	} else {
		return false;
	}
}

module.exports = functions;
