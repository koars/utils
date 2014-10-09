var logger;
var bunyan = require('bunyan');
var es = require('event-stream');

function name() {
	return process.env.NAME || 'koars';
}

function port() {
	return process.env.PORT ? parseInt(process.env.PORT) : 3000;
}

function basepath() {
	return process.env.BASEPATH || '';
}

function dev() {
	return (test() ? process.env.NODE_ENV_TEST : process.env.NODE_ENV) !== 'production';
}

function test() {
	return process.env.NODE_ENV === 'test';
}

module.exports = function(logOptions) {
	//Create a new logger if needed
	if(!logger) {
		logger = bunyan.createLogger({
			name: name(),
			level: dev() ? 'trace' : 'info',
			src: dev(),
			stream: test() ? es.map(function(a,b){b();}) : process.stdout
		});
	}

	//Return all the function and if neccessary a child logger
	return {
		name: name,
		port: port,
		basepath: basepath,
		dev: dev,
		test: test,
		log: logOptions ? logger.child(logOptions) : logger
	};
};