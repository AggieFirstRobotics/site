class LinkHelpers {
	constructor() {
	}

	registerHooks(hookRegisterer) {
		hookRegisterer('pre-register_helpers', this.registerHelpers);
	}

	registerHelpers() {
		return {
			"email-link": function emailLinkHelper() {
				const emailAddress = this.instance.data.site.social.email;
				const {SafeString} = this.instance._hbs;
				return new SafeString(
					`<a href="mailto:${emailAddress}">${emailAddress}</a>`
				);
			},
			"social-link": function linkToHelper(thing, text = false) {
				const {social} = this.instance.data.site;
				const {escapeExpression} = this.instance._hbs.Utils;
				text = escapeExpression(text || thing);
				if (social[thing]) {
					return new this.instance._hbs.SafeString(
						`<a href="${social[thing]}">${text}</a>`
					);
				} else  {
					console.trace(`Unable to find link for ${thing}`);
					return '';
				}
			}
		};
	}
}

module.exports = new LinkHelpers();
