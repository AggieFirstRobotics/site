'use strict';

class FilterHelper {
	constructor() {
	}

	registerHooks(hookRegisterer) {
		hookRegisterer('pre-register_helpers', this.registerHelper)
	}

	registerHelper() {
		return {
			"filter": function filterHelper(input, options) {
				const {hash, fn, inverse} = options;
				let {data} = options;
				if (!Array.isArray(input)) {
					throw new Error('Filter: input must be array');
				}

				if (!fn) {
					throw new Error('Filter is a block helper');
				}

				if (data) {
					data = this.instance._hbs.handlebars.createFrame(data);
				}

				const filters = Object.keys(hash);

				const results = input.filter(item =>
					filters.reduce(
						(state, key) => state && (item[key] === hash[key]),
						true
					)
				);

				if (results.length > 0) {
					if (data) {
						data.results = results;
					}

					return fn({results}, {data, blockParams: [results]});
				}

				return inverse(this);
			}
		};
	}
}

module.exports = new FilterHelper();
