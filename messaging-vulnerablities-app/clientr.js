const net = require('net');
const crypto = require('crypto');

process.env.server_port = 8080;
process.env.server_ip = 'localhost';
process.env.key = 'tttttttttttttttttttttttttttttttt';
process.env.hkey = 'testkey';
let arg = 0;

let create_connection = (host, port) => {
	const socket = net.connect({
		host: host,
		port: port
	});
	socket.setEncoding('utf-8');
	let message_printer = (data) => {
		try {
			let temp = JSON.parse(data);
			arg = temp.arg;
		} catch (error) {
			console.log(error);
		}
		let json = {};
		let hash, decipher, plain_text, verifier;
		switch (arg) {
			case 0:
				try {
					json = JSON.parse(data);
					if (json.message) {
						console.log('--------------------------------------');
						console.log(arg, 'X:', json.message);
						console.log('--------------------------------------');
					} else {
						console.log('--------------------------------------');
						console.log(json);
						console.log('--------------------------------------');
					}
				} catch (error) {
					console.log('Error parsing json data: ', data);
				}
				break;
			case 1:
				try {
					json = JSON.parse(data);
					if (json.message && json.hash) {
						hash = crypto.createHash('sha256').update(json.message).digest('hex');
						if (hash == json.hash) {
							console.log('--------------------------------------');
							console.log(arg, 'X:', json.message);
							console.log('--------------------------------------');
						} else {
							console.log('--------------------------------------');
							console.log('Message change detected.');
							console.log('--------------------------------------');
						}
					} else {
						console.log('--------------------------------------');
						console.log(json);
						console.log('--------------------------------------');
					}
				} catch (error) {
					console.log('Error parsing json data: ', data);
				}
				break;
			case 2:
				try {
					json = JSON.parse(data);
					if (json.message && json.iv) {
						decipher = crypto.createDecipheriv('aes-256-cbc', process.env.key, json.iv);
						plain_text = decipher.update(json.message, 'hex', 'utf-8');
						plain_text += decipher.final('utf-8');
						console.log('--------------------------------------');
						console.log(arg, 'X:', plain_text);
						console.log('--------------------------------------');
					} else {
						console.log('--------------------------------------');
						console.log(json);
						console.log('--------------------------------------');
					}
				} catch (error) {
					console.log('Error parsing json data: ', data);
				}
				break;
			case 3:
				try {
					json = JSON.parse(data);
					if (json.message && json.iv && json.hash) {
						hash = crypto.createHash('sha256').update(json.message).digest('hex');
						if (hash == json.hash) {
							decipher = crypto.createDecipheriv('aes-256-cbc', process.env.key, json.iv);
							plain_text = decipher.update(json.message, 'hex', 'utf-8');
							plain_text += decipher.final('utf-8');
							console.log('--------------------------------------');
							console.log(arg, 'X:', plain_text);
							console.log('--------------------------------------');
						} else {
							console.log('--------------------------------------');
							console.log('Message change detected.');
							console.log('--------------------------------------');
						}
					} else {
						console.log('--------------------------------------');
						console.log(json);
						console.log('--------------------------------------');
					}
				} catch (error) {
					console.log('Error parsing json data: ', data);
				}
				break;
			case 4:
				try {
					json = JSON.parse(data);
					if (json.message && json.iv && json.hash) {
						hash = crypto.createHmac('sha256', process.env.hkey).update(json.message).digest('hex');
						if (hash == json.hash) {
							decipher = crypto.createDecipheriv('aes-256-cbc', process.env.key, json.iv);
							plain_text = decipher.update(json.message, 'hex', 'utf-8');
							plain_text += decipher.final('utf-8');
							console.log('--------------------------------------');
							console.log(arg, 'X:', plain_text);
							console.log('--------------------------------------');
						} else {
							console.log('--------------------------------------');
							console.log('Message change detected.');
							console.log('--------------------------------------');
						}
					} else {
						console.log('--------------------------------------');
						console.log(json);
						console.log('--------------------------------------');
					}
				} catch (error) {
					console.log('Error parsing json data: ', data);
				}
				break;
			case 5:
				try {
					json = JSON.parse(data);
					if (json.message && json.iv && json.hash && json.public_key && json.signature) {
						hash = crypto.createHmac('sha256', process.env.hkey).update(json.message).digest('hex');
						if (hash == json.hash) {
							decipher = crypto.createDecipheriv('aes-256-cbc', process.env.key, json.iv);
							plain_text = decipher.update(json.message, 'hex', 'utf-8');
							plain_text += decipher.final('utf-8');
							verifier = crypto.createVerify('RSA-SHA256');
							verifier.write(plain_text);
							verifier.end();
							if (verifier.verify(json.public_key, json.signature, 'hex')) {
								console.log('--------------------------------------');
								console.log(arg, 'X:', plain_text);
								console.log('--------------------------------------');
							} else {
								console.log('--------------------------------------');
								console.log('Wrong Signature.');
								console.log('--------------------------------------');
							}
						} else {
							console.log('--------------------------------------');
							console.log('Message change detected.');
							console.log('--------------------------------------');
						}
					} else {
						console.log('--------------------------------------');
						console.log(json);
						console.log('--------------------------------------');
					}
				} catch (error) {
					console.log('Error parsing json data: ', data);
				}
				break;
			default:
				try {
					json = JSON.parse(data);
					if (json.message) {
						console.log('--------------------------------------');
						console.log(arg, 'X:', json.message);
						console.log('--------------------------------------');
					} else {
						console.log('--------------------------------------');
						console.log(json);
						console.log('--------------------------------------');
					}
				} catch (error) {
					console.log('Error parsing json data: ', data);
				}
		}
	}

	socket.on('error', (error) => {
		console.log(error);
		process.kill(process.pid, 'SIGINT');
	});

	socket.on('connect', () => {
		console.log('Connection established.');
	});

	socket.on('data', (data) => {
		message_printer(data);
	});

	socket.on('close', () => {
		process.exit();
	});

	process.on('SIGINT', () => {
		console.log('Closing the client.');
		socket.end();
		socket.destroy();
		process.exit();
	});
}

create_connection(process.env.server_ip, process.env.server_port);
