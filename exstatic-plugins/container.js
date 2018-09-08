'use strict';

class ContainerWrapper {
	constructor() {
	}

	registerHooks(hookRegisterer) {
		hookRegisterer('pre-register_helpers', this.registerHelper)
	}

	registerHelper() {
		return {
			"container": function containerHelper(options) {
				function generateString(settings, input) {
					return `
					<${settings.tagname} ${settings.id}class="container${settings.class}">\n
						{{__CONTAINER_HELPER__INPUT}}
					</${settings.tagname}>\n\n`
						// We use linebreaks for clarity, but with the number of tabs, marked sees it as a codeblock
						.replace(/\t/g, '')
						// We don't want to lose the tabs from the input, so add it after removing our tabs
						.replace('{{__CONTAINER_HELPER__INPUT}}', input);
				}
				const {SafeString, Utils: {escapeExpression}} = this.instance._hbs;
				const settings = Object.assign({
					tagname: 'section',
					class: false,
					id: false
				}, options.hash);

				settings.class = settings.class ? ` ${escapeExpression(settings.class)}` : '';
				settings.id = settings.id ? `id="${escapeExpression(settings.id)}" ` : '';
				settings.tagname = escapeExpression(settings.tagname);

				return new SafeString(generateString(settings, options.fn(this)));
			}
		};
	}
}

module.exports = new ContainerWrapper();
