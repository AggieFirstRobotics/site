'use strict';

const {promisify} = require('util');
const {readFile} = require('fs');

const read = promisify(readFile);

class IconHelper {
	constructor() {
		this.cache = {};
		this.sourceFolder = process.cwd() + '/src/assets/icons';
	}

	updateOptions(opts) {
		this.sourceFolder = opts.sourceFolder || this.sourceFolder;
	}

	clearCache() {
		this.cache = {};
	}

	registerHooks(hookRegisterer) {
		hookRegisterer('pre-register_helpers', this.registerHelper.bind(this));
	}

	registerHelper() {
		const self = this;
		const sourceFolder = this.sourceFolder;
		function iconHelper(name, options, callback) {
			const {cache} = self;
			console.log('Loading icon', name);
			if (typeof options === 'function') {
				callback = options;
				options = {};
			}

			const {SafeString} = this.instance._hbs;
			const opts = Object.assign({
				wrapper: true,
				type: 'svg'
			}, options.hash);

			let content = '', dataPromise;
			name = name.toLowerCase().replace(/ /g, '-');
			if (cache[name]) {
				console.log('Loading icon from cache', name);
				dataPromise = Promise.resolve(cache[name]);
			} else {
				// Note: there is no filtering of the name because we trust the input
				const fileName = `${sourceFolder}/${name}.${opts.type}`;
				dataPromise = read(fileName, 'utf8').then(data => {
					if (data.length) {
						cache[name] = data;
					}
					return data;
				}).catch(() => '');
			}

			dataPromise.then(data => {
				if (!data) {
					console.warn('Unable to locate icon:', name);
					callback(new SafeString(''));
				}

				content += data;

				if (options.wrapper) {
					contents = `<i>${content}</i>`;
				}

				callback(new SafeString(content));
			});
		}

		return {
			async: {
				icon: iconHelper
			}
		};
	}
}

module.exports = new IconHelper();
