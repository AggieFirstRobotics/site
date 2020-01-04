class VisualHelpers {
	constructor() {
	}

	registerHooks(hookRegisterer) {
		hookRegisterer('pre-register_helpers', this.registerHelpers);
	}

	registerHelpers() {
		return {
			"fancy-button": function fancyButtonHelper({fn}) {
				const {SafeString} = this.instance._hbs;
				let output = '<button class="fancy-button">';
				output += fn(this).replace(/^\s{1,}/g, '').replace(/\n/g,'');
				output += '</button>';

				return new SafeString(output);
			},
			"center": function centerHelper({fn}) {
				const markup = fn(this).replace(/^\s{1,}/g, ''); // @todo: remove need for this in exstatic
				return new this.instance._hbs.SafeString(
					`<div class="center">\n\n${markup}</div>\n\n`
				);
			}
		};
	}
}

module.exports = new VisualHelpers();
