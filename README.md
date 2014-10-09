koars-utils
===========
[![Build Status](https://img.shields.io/travis/koars/utils.svg?style=flat)](https://travis-ci.org/koars/utils)

This package provides several utility functions for the koars framework and its dependencies.
Run tests via `npm test`.

Setup
-----
The module exports a single function:

	var util = require('koars-util')(logOptions);

`logOptions` is an optional argument.

### util.name()
Returns the name of your program as set in the `NAME` environment variable. Defaults to `koars`.

### util.port()
Returns the port of your program as set in the `PORT` environment variable. Defaults to `3000`.

### util.basepath()
Returns the basepath of your program as set in the `BASEPATH` environment variable. Defaults to an empty string.

### util.dev()
Returns a boolean exclaiming if your program is running in development mode. Defaults to `true` if the `NODE_ENV` environment variable is set to anything but `production`.
If `NODE_ENV` is set to `test`, the `NODE_ENV_TEST` variable ist used.

### util.test()
Returns true if `NODE_ENV` is set to `test`, `false` otherwise.

### util.log
Assigned a [bunyan](https://github.com/trentm/node-bunyan) logger. This is either a global logger if the module was called without arguments, or a childlogger of said global logger created via:

	logger.child(logOptions);

If `util.test()` returns true, all loggers will dump their output.