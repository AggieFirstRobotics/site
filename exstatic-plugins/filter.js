'use strict';

class Filter {
	constructor() {
	}

	registerHooks(hookRegisterer) {
		hookRegisterer('pre-register_helpers', this.registerHelper)
	}

	registerHelper() {
		return {
			"filteredSponsors": function filterHelper(sponsors, type) {
				const {SafeString, handlebars} = this.instance._hbs;
				const {url} = handlebars.helpers;
				const urlFor = (link) => url.call(this, link).string;

				// todo: abstract this to a filter helper
				const list = sponsors.filter(sponsor => sponsor.type === type);

				let html = '';
				if (list.length) {
					html = `<h1 class="">${type.replace(/^[a-z]/, a => a.toUpperCase())} Sponsors</h1>
						<div class="supporter-grid vertically-centered">
					`;

					list.forEach(item => {
						let localHtml = '<div class="supporter-single">\n';

						if(item.link) {
							localHtml += `<a href="${item.link}" title="${item.name}" target="_blank" rel="nofollow noreferrer">`
						}

						localHtml += `<img class="supporter-logo color" src="${urlFor(item.logo)}" alt="${item.name}" />`

						if (item.link) {
							localHtml += '</a>';
						}

						html += `${localHtml}</div>`;
					});

					html += '</div>'
				}
				return new SafeString(html);
			}
		};
	}
}

module.exports = new Filter();
