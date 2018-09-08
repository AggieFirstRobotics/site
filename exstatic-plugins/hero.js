'use strict';

class HeroHelper {
	constructor() {
	}

	registerHooks(hookRegisterer) {
		hookRegisterer('pre-register_helpers', this.registerHelper)
	}

	registerHelper() {
		return {
			"hero": function containerHelper(title) {
				const {SafeString} = this.instance._hbs;
				title = typeof title === 'string' ? title : this.page.title;

				return new SafeString(`<section id="hero" class="container p0 m0"><h1>${title}</h1></section>\n\n`);
			}
		};
	}
}

module.exports = new HeroHelper();
