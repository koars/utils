var logger;
var bunyan = require('bunyan');
var cfg = require('koars-config')();
var es = require('event-stream');
var defaults = require('koars-defaults');
var hbs = require('handlebars');

function name() {
	return process.env.NAME || 'koars';
}

function port() {
	return process.env.PORT ? parseInt(process.env.PORT) : 3000;
}

function basepath() {
	return process.env.BASEPATH || '';
}

function config() {
	return process.env.CONFIG || 'config';
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

	var targetConf = cfg(config());
	defaults(targetConf);

	//Return all the function and if neccessary a child logger
	return {
		config: targetConf,
		name: name,
		port: port,
		basepath: basepath,
		dev: dev,
		test: test,
		log: logOptions ? logger.child(logOptions) : logger,
		hbs: hbs
	};
};
