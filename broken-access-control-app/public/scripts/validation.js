let password_tester = (password) => {
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

let username_tester = (username) => {
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

let password_validator = (form_id, error_field) => {
	let password = document.forms[form_id].password.value;
	if (password_tester(password) && password.length >= 6 && password.length < 100) {
		return true;
	} else {
		document.getElementById(error_field).innerText = 'Password is less than 6 characters or more than 100 characters or the password doesn\'t consist of atleast one uppercase and lowercase character and a number';
	}
}

let username_validator = (form_id, error_field) => {
	let username = document.forms[form_id].username.value;
	if (username_tester(username) && username.length < 100) {
		return true;
	} else {
		document.getElementById(error_field).innerText = 'Username is more than 100 characters or the password doesn\'t consist of characters other than uppercase, lowercase characters or a number';
	}
}

let equality_checker = (form_id, error_field) => {
	let password = document.forms[form_id].password.value;
	let check_password = document.forms[form_id].check_password.value;
	if (password == check_password) {
		return true;
	} else {
		document.getElementById(error_field).innerText = 'The password and retype password fields are not the same.';
	}
}

let email_validator = (form_id, email_field_name, error_field) => {
	let email = document.forms[form_id][email_field_name].value;
	if (email.length < 100) {
		return true;
	} else {
		document.getElementById(error_field).innerText = 'The email must not be more than 100 characters in length.';
	}
}
