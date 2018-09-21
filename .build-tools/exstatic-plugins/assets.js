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
				const { SafeString } = this.instance._hbs;
				const { url } = this.instance._hbs.handlebars.helpers;

				let bustedCSS;
				let bustedJS;

				try {
					delete require.cache[require.resolve('../build/cachebust-styles.json')];
					bustedCSS = require('../build/cachebust-styles.json')['styles.min.css'];
				} catch (e) { }

				try {
					delete require.cache[require.resolve('../build/cachebust-scripts.json')];
					bustedJS = require('../build/cachebust-scripts.json')['scripts.min.js'];
				} catch (e) { }

				bustedCSS = url.call(this, `/assets/css/${bustedCSS ? bustedCSS : 'styles.min.css'}`).string;
				bustedJS = url.call(this, `/assets/js/${bustedJS ? bustedJS : 'scripts.min.js'}`).string;

				return new SafeString(`
					<link rel="stylesheet" href="${bustedCSS}" />
					<script src="${bustedJS}" async defer></script>
				`);
			}
		};
	}
}

module.exports = new Assets();
