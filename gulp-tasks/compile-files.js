'use strict';
process.env.EXSTATIC_LOG_LEVEL = 'error';
const exstatic = require('exstatic')({ outputDir: './build' });
const PRODUCTION_URL = 'https://aggiefirstrobotics.org';

module.exports = cb => {
	const opts = {};

	// CASE: Netlify deploy preview
	// CASE: Custom build in non-netlify environment
	// CASE: Netlify production deployment (we set the variable there)
	if (process.env.CONTEXT && process.env.CONTEXT === 'deploy-preview') {
		opts.url = process.env.DEPLOY_PRIME_URL;
	} else if (process.env.NODE_ENV === 'production') {
		opts.url = PRODUCTION_URL;
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
