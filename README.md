koars-utils
===========
[![Build Status](https://img.shields.io/travis/koars/utils.svg?style=flat)](https://travis-ci.org/koars/utils)

This package provides several utility functions for the koars framework and its dependencies.
Run tests via `npm test`.

Setup
-----
The module exports a single function:

	var utils = require('koars-utils')(logOptions);

`logOptions` is an optional argument.

### utils.name()
Returns the name of your program as set in the `NAME` environment variable. Defaults to `koars`.

### utils.port()
Returns the port of your program as set in the `PORT` environment variable. Defaults to `3000`.

### utils.basepath()
Returns the basepath of your program as set in the `BASEPATH` environment variable. Defaults to an empty string.

### utils.dev()
Returns a boolean exclaiming if your program is running in development mode. Defaults to `true` if the `NODE_ENV` environment variable is set to anything but `production`.
If `NODE_ENV` is set to `test`, the `NODE_ENV_TEST` variable ist used.

### utils.test()
Returns true if `NODE_ENV` is set to `test`, `false` otherwise.

### utils.log
Assigned a [bunyan](https://github.com/trentm/node-bunyan) logger. This is either a global logger if the module was called without arguments, or a childlogger of said global logger created via:

	logger.child(logOptions);

If `utils.test()` returns true, all loggers will dump their output.

### utils.config
An instance of [koars-config](https://github.com/koars/config) instantiated to the directory passed in the `CONFIG` environment variable (defaults to `config`).