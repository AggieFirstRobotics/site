'use strict';

class Assets {
	constructor() {
	}

	registerHooks(hookRegisterer) {
		hookRegisterer('pre-register_helpers', this.registerHelper)
	}

	registerHelper() {
		return {
			"assets": function assetsHelper() {
				const BUILD_PATH = '../../build';
				const { SafeString } = this.instance._hbs;
				const { url } = this.instance._hbs.handlebars.helpers;

				let bustedCSS = 'styles.min.css';
				let bustedJS = 'scripts.min.js';

				try {
					delete require.cache[require.resolve(`${BUILD_PATH}/cachebust-styles.json`)];
					bustedCSS = require(`${BUILD_PATH}/cachebust-styles.json`)['styles.min.css'];
				} catch (e) { }

				try {
					delete require.cache[require.resolve(`${BUILD_PATH}/cachebust-scripts.json`)];
					bustedJS = require(`${BUILD_PATH}/cachebust-scripts.json`)['scripts.min.js'];
				} catch (e) { }

				bustedCSS = url.call(this, `/assets/css/${bustedCSS}`).string;
				bustedJS = url.call(this, `/assets/js/${bustedJS}`).string;

				return new SafeString(`
					<link rel="stylesheet" href="${bustedCSS}" />
					<script src="${bustedJS}" async defer></script>
				`);
			}
		};
	}
}

module.exports = new Assets();
