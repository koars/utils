var rewire = require('rewire');
var sinon = require('sinon');
var util = rewire('../index.js');
var defaults = sinon.spy();
var configs = {
	defaults: function() {}
};
var config = sinon.stub().returns(configs);

util.__set__('cfg', config);
util.__set__('defaults', defaults);

//Reset the environment before each test is run
beforeEach(function() {
	delete process.env.NAME;
	delete process.env.PORT;
	delete process.env.BASEPATH;
	delete process.env.NODE_ENV;
});



describe('The name() function', function() {
	var koars = util();

	it('provides a name if set', function() {
		var name = 'Some Name';
		process.env.NAME = name;
		koars.name().must.be(name);
	});

	it('defaults to "koars" if not set', function() {
		koars.name().must.be('koars');
	});
});

describe('The port() function', function() {
	var koars = util();

	it('provides a port if set', function() {
		process.env.PORT = '2000';
		koars.port().must.be(2000);
	});

	it('defaults to "3000" if not set', function() {
		koars.port().must.be(3000);
	});
});

describe('The basepath() function', function() {
	var koars = util();

	it('provides a path if set', function() {
		var path = 'SomePath';
		process.env.BASEPATH = path;
		koars.basepath().must.be(path);
	});

	it('defaults to an empty string if not set', function() {
		koars.basepath().must.be('');
	});
});

describe('The dev() function', function() {
	var koars = util();

	it('returns "false" if NODE_ENV is set to "production"', function() {
		process.env.NODE_ENV = 'production';
		koars.dev().must.be(false);
	});

	it('returns "true" if NODE_ENV is not set', function() {
		koars.dev().must.be(true);
	});

	it('returns "true" if NODE_ENV is set to something else', function() {
		process.env.NODE_ENV = 'something';
		koars.dev().must.be(true);
	});
});

describe('If required without log options', function() {
	var koars = util();

	it('Provides a bunyan instance as ".log"', function() {
		koars.log.info.must.exist();
		koars.log.debug.must.exist();
	});

	it('Provides the same instance each time', function() {
		koars.log.must.be(util().log);
	});
});

describe('If required with log options', function() {
	var koars = util({option1: 'some', option2: 'thing'});

	it('Provides a bunyan instance as ".log"', function() {
		koars.log.info.must.exist();
		koars.log.debug.must.exist();
	});

	it('Assigns the correct options to the child logger', function() {
		koars.log.fields.option1.must.be('some');
		koars.log.fields.option2.must.be('thing');
	});

	it('".log" is a child logger of the global instance', function() {
		koars.log.fields.name.must.be(util().log.fields.name);
		koars.log.fields.hostname.must.be(util().log.fields.hostname);
		koars.log.fields.pid.must.be(util().log.fields.pid);
	});
});

describe('Assigns a correct config instance', function() {
	it('by default', function() {
		var koars = util();
		koars.config.must.be(configs);
		config.calledWith('config').must.be.true();
	});

	it('after a config directoy is set', function() {
		process.env.CONFIG = 'otherconfig';

		var koars = util();
		koars.config.must.be(configs);
		config.calledWith('otherconfig').must.be.true();
	});

	it('and adds defaults', function() {
		var koars = util();
		defaults.calledWith(configs).must.be.true();
	});
});
