const net = require('net');
const crypto = require('crypto');

process.env.port = 8080;
process.env.host = 'localhost';
process.env.key = 'tttttttttttttttttttttttttttttttt';
process.env.iv = 'tttttttttttttttt';
process.env.cport = 8081;
process.env.chost = 'localhost';

let hash_map = new Map();

let server = net.createServer();

server.listen(process.env.port, (error) => {
	if (error) {
		console.log('Port already in use.');
		process.exit();
	} else {
		console.log('Server is Running.');
	}
});

server.on('connection', (socket) => {
	socket.setEncoding('utf-8');
	let identifier = socket.remoteAddress + ':' + socket.remotePort.toString();
	console.log('Client joined-', identifier);
	hash_map.set(identifier, socket);
	socket.on('data', (data) => {
		try {
			let json = JSON.parse(data);
			console.log('--------------');
			console.log(identifier + ':', json);
			console.log('--------------');
		} catch (error) {
			console.log(identifier + ':', data);
		}
		for (let i of hash_map.keys()) {
			if (identifier == i) {
				continue;
			} else {
				let temp = hash_map.get(i);
				temp.write(data);
				break;
			}
		}
	});
	socket.on('close', (error) => {
		console.log('Client disconnected-', identifier);
		hash_map.delete(identifier);
	});
});

const client_socket = net.connect({
	port: process.env.cport,
	host: process.env.chost
});

client_socket.setEncoding('utf-8');

client_socket.on('connect', () => {
	console.log('Connected to control center.');
});

client_socket.on('data', (data) => {
	try {
		let arg = parseInt(data);
		let temp1;
		for (let i of hash_map.keys()) {
			temp1 = hash_map.get(i);
			break;
		}
		let json = {};
		let hash, iv = process.env.iv, cipher, cipher_data;
		switch (arg) {
			case 0:
				json = {
					message: 'Send Password',
					arg: arg
				}
				temp1.write(JSON.stringify(json));
				break;
			case 1:
				hash = crypto.createHash('sha256').update('Send Password').digest('hex');
				json = {
					hash: hash,
					arg: arg,
					message: 'Send Password'
				}
				temp1.write(JSON.stringify(json));
				break;
			case 2:
				cipher = crypto.createCipheriv('aes-256-cbc', process.env.key, iv);
				cipher_data = cipher.update('Send Password', 'utf-8', 'hex');
				cipher_data += cipher.final('hex');
				json = {
					iv: iv,
					arg: arg,
					message: cipher_data
				}
				temp1.write(JSON.stringify(json));
				break;
			case 3:
				cipher = crypto.createCipheriv('aes-256-cbc', process.env.key, iv);
				cipher_data = cipher.update('Send Password', 'utf-8', 'hex');
				cipher_data += cipher.final('hex');
				hash = crypto.createHash('sha256').update(cipher_data).digest('hex');
				json = {
					hash: hash,
					arg: arg,
					iv: iv,
					message: cipher_data
				}
				temp1.write(JSON.stringify(json));
				break;
			case 11:
				hash = crypto.createHash('sha256').update('Hi').digest('hex');
				json = {
					hash: hash,
					arg: 1,
					message: 'Send Password'
				}
				temp1.write(JSON.stringify(json));
				break;
			case 33:
				cipher = crypto.createCipheriv('aes-256-cbc', process.env.key, iv);
				cipher_data = cipher.update('Send Password', 'utf-8', 'hex');
				cipher_data += cipher.final('hex');
				hash = crypto.createHash('sha256').update(cipher_data).digest('hex');
				json = {
					hash: hash,
					arg: 3,
					iv: iv,
					message: 'ab1231acde'
				}
				temp1.write(JSON.stringify(json));
				break;
			default:
				json = {
					message: 'Send Password',
					arg: arg
				}
				temp1.write(JSON.stringify(json));
		}
		console.log('Simulation done.');
	} catch (error) {
		console.log(error);
		client_socket.end();
		client_socket.destroy();
		process.kill(process.pid, 'SIGINT');
	}
});

client_socket.on('error', (error) => {
	console.log(error);
	process.kill(process.pid, 'SIGINT');
});

client_socket.on('close', () => {
	process.kill(process.pid, 'SIGINT');
});

process.on('SIGINT', () => {
	console.log('Closing the server.');
	server.close();
	process.exit();
});
