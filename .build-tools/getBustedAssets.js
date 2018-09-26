'use strict'

module.exports = function getBustedAssets(fallback = false) {
	const BUILD_PATH = '../build';

	let css = fallback  || 'styles.min.css';
	let js = fallback || 'scripts.min.js';

	try {
		delete require.cache[require.resolve(`${BUILD_PATH}/cachebust-styles.json`)];
		css = require(`${BUILD_PATH}/cachebust-styles.json`)['styles.min.css'];
	} catch (e) { }

	try {
		delete require.cache[require.resolve(`${BUILD_PATH}/cachebust-scripts.json`)];
		js = require(`${BUILD_PATH}/cachebust-scripts.json`)['scripts.min.js'];
	} catch (e) { }

	return {
		css,
		js
	}
};
