const net = require('net');
const crypto = require('crypto');
const keys = crypto.generateKeyPairSync('rsa', {
	modulusLength: 2048,
	publicKeyEncoding: {
		type: 'spki',
		format: 'pem'
	},
	privateKeyEncoding: {
		type: 'pkcs8',
		format: 'pem'
	}
});

let private_key = keys.privateKey;
let public_key = keys.publicKey;
console.log('Generated public and private keys.');
process.env.server_port = 8080;
process.env.server_ip = 'localhost';
process.env.key = 'tttttttttttttttttttttttttttttttt';
process.env.iv = 'tttttttttttttttt';
process.env.hkey = 'testkey';
let arg = 0;
if (process.argv.length == 3) {
	arg = parseInt(process.argv[2]);
}

let create_connection = (host, port) => {
	const socket = net.connect({
		port: port,
		host: host
	});
	let message_sender = (data) => {
		let json = {};
		let hash, iv = process.env.iv, cipher, cipher_data, signer, signature;
		switch (arg) {
			case 0:
				json = {
					message: data,
					arg: arg
				}
				return JSON.stringify(json);
				break;
			case 1:
				hash = crypto.createHash('sha256').update(data).digest('hex');
				json = {
					hash: hash,
					arg: arg,
					message: data
				}
				return JSON.stringify(json);
				break;
			case 2:
				cipher = crypto.createCipheriv('aes-256-cbc', process.env.key, iv);
				cipher_data = cipher.update(data, 'utf-8', 'hex');
				cipher_data += cipher.final('hex');
				json = {
					iv: iv,
					arg: arg,
					message: cipher_data
				}
				return JSON.stringify(json);
				break;
			case 3:
				cipher = crypto.createCipheriv('aes-256-cbc', process.env.key, iv);
				cipher_data = cipher.update(data, 'utf-8', 'hex');
				cipher_data += cipher.final('hex');
				hash = crypto.createHash('sha256').update(cipher_data).digest('hex');
				json = {
					hash: hash,
					arg: arg,
					iv: iv,
					message: cipher_data
				}
				return JSON.stringify(json);
				break;
			case 4:
				cipher = crypto.createCipheriv('aes-256-cbc', process.env.key, iv);
				cipher_data = cipher.update(data, 'utf-8', 'hex');
				cipher_data += cipher.final('hex');
				hash = crypto.createHmac('sha256', process.env.hkey).update(cipher_data).digest('hex');
				json = {
					hash: hash,
					arg: arg,
					iv: iv,
					message: cipher_data
				}
				return JSON.stringify(json);
				break;
			case 5:
				cipher = crypto.createCipheriv('aes-256-cbc', process.env.key, iv);
				cipher_data = cipher.update(data, 'utf-8', 'hex');
				cipher_data += cipher.final('hex');
				hash = crypto.createHmac('sha256', process.env.hkey).update(cipher_data).digest('hex');
				signer = crypto.createSign('RSA-SHA256');
				signer.write(data);
				signer.end();
				signature = signer.sign(private_key, 'hex');
				json = {
					signature: signature,
					arg: arg,
					public_key: public_key,
					hash: hash,
					iv: iv,
					message: cipher_data
				}
				return JSON.stringify(json);
				break;
			default:
				json = {
					message: data,
					arg: arg
				}
				return JSON.stringify(json);
		}
	}

	socket.on('error', (error) => {
		console.log(error);
		process.kill(process.pid, 'SIGINT');
	});

	socket.on('connect', () => {
		console.log('Connection established.');
		console.log('Sending message.');
		socket.write(message_sender('Hi'));
		process.kill(process.pid, 'SIGINT');
	});

	socket.on('close', () => {
		console.log('Connection closed.');
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
