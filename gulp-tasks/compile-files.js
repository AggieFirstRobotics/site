'use strict';
process.env.EXSTATIC_LOG_LEVEL = 'error';
const exstatic = require('exstatic')({ outputDir: './build' });
const STAGING_URL = 'https://afr.vikasclien.tk';
const PRODUCTION_URL = 'https://aggiefirstrobotics.org';

module.exports = cb => {
	const opts = {};

	if (process.env.NODE_ENV === 'production') {
		opts.url = PRODUCTION_URL;
	} else if (process.env.FOR_STAGING) {
		opts.url = STAGING_URL;
	} else if (process.env.EXSTATIC_DEPLOY_URL) {
		opts.url = process.env.EXSTATIC_DEPLOY_URL;
	}

	return exstatic.initialize(opts)
		.then(() => exstatic.loadFiles())
		.then(() => exstatic.write(true))
		.then(() => {
			cb();
		});
};

module.exports.exstatic = exstatic;
