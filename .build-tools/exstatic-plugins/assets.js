'use strict';
const getBustedAssets = require('../getBustedAssets.js');
class Assets {
	constructor() {
	}

	registerHooks(hookRegisterer) {
		hookRegisterer('pre-register_helpers', this.registerHelper)
	}

	registerHelper() {
		return {
			"assets": function assetsHelper() {
				const {css, js} = getBustedAssets(true);
				const {SafeString} = this.instance._hbs;
				const {url} = this.instance._hbs.handlebars.helpers;

				const bustedCSS = url.call(this, `/assets/css/${css}`).string;
				const bustedJS = url.call(this, `/assets/js/${js}`).string;

				return new SafeString(`
					<link rel="stylesheet" href="${bustedCSS}" />
					<script src="${bustedJS}" async defer></script>
				`);
			}
		};
	}
}

module.exports = new Assets();
