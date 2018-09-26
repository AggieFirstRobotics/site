'use strict';
process.env.EXSTATIC_LOG_LEVEL = 'error';
let exstatic;
const PRODUCTION_URL = 'https://aggiefirstrobotics.org';

module.exports = cb => {
	const opts = {cache: false};

	if (!exstatic) {
		const {resolve} = require('path');
		exstatic = require('exstatic')({
			inputDir: './src/pages',
			outputDir: './build',
			layoutsDir: '{input}/../layouts',
			partialsDir: '{input}/../components'
		});
		module.exports.exstatic = exstatic;
	}

	// CASE: Netlify deploy preview
	// CASE: Custom build in non-netlify environment
	// CASE: Netlify production deployment (we set the variable there)
	if (process.env.CONTEXT && process.env.CONTEXT === 'deploy-preview') {
		opts.url = process.env.DEPLOY_PRIME_URL;
		opts.cache = true;
	} else if (process.env.NODE_ENV === 'production') {
		opts.url = PRODUCTION_URL;
		opts.cache = true;
	} else if (process.env.EXSTATIC_DEPLOY_URL) {
		opts.url = process.env.EXSTATIC_DEPLOY_URL;
		opts.cache = true;
	}

	return exstatic.initialize(opts)
		.then(() => exstatic.loadFiles())
		.then(() => exstatic.write(true))
		.then(() => {
			cb();
		});
};
