'use strict';

const getBustedAssets = require('../getBustedAssets.js');

module.exports = function generateHeaders() {
	const headers = {
		'X-Frame-Options': 'SAMEORIGIN',
		'Referrer-Policy': 'strict-origin-when-cross-origin',
		'X-XSS-Protection': '1; mode=block',
		'Feature-Policy': 'none',
		'Strict-Transport-Security': 'max-age=15552000; includeSubDomains; preload',
		'X-Content-Type-Options': 'nosniff',
		'link': []
	};

	const {css, js} = getBustedAssets(false);

	if (css) {
		headers.link.push(`</assets/css/${css}>; rel=preload; as=style`);
	}

	if (js) {
		headers.link.push(`</assets/js/${js}>; rel=preload; as=script`);
	}

	let fileContents = `/*\n`;

	Object.keys(headers).forEach(headerName => {
		const header = headers[headerName];
		if (Array.isArray(header)) {
			header.forEach(duplicateItem => {
				fileContents += `\t${headerName}: ${duplicateItem}\n`;
			});
		} else {
			fileContents += `\t${headerName}: ${header}\n`;
		}
	});

	// Cache styles and scripts for 2 years; any updates will generate a new hash
	fileContents += '/assets/js/*\n\tCache-Control: public, max-age=63072000\n';
	fileContents += '/assets/css/*\n\tCache-Control: public, max-age=63072000\n';

	const dest = process.env.DIST ? './dist/_headers' : './build/_headers';
	const {writeFileSync} = require('fs');
	writeFileSync(dest, fileContents);
}
