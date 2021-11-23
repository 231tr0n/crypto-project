const net = require('net');
const prompt = require('prompt-sync')();

process.env.port = 8081;
process.env.host = 'localhost';

let server = net.createServer();

server.listen(process.env.port, (error) => {
	if (error) {
		console.log('Port already in use.');
		process.exit();
	} else {
		console.log('Server is running.');
	}
});

let bool = false;
let temp;

let input_function = () => {
	let input = prompt('Enter number or something to exit: ');
	temp.write(input);
	if (!bool) {
		setTimeout(input_function, 0);
	}
}

server.on('connection', (socket) => {
	socket.setEncoding('utf-8');
	temp = socket;
	setTimeout(input_function, 0);
	socket.on('close', () => {
		bool = true;
		process.kill(process.pid, 'SIGINT');
	});
});


process.on('SIGINT', () => {
	bool = true;
	console.log('Closing the server.');
	server.close();
	process.exit();
})
