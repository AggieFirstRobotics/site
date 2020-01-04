'use strict';

const {readFileSync} = require('fs'); // @todo: use async

const getFileContents = file => readFileSync(file, 'utf8');

const getFileContents = async (file) => await read(file, 'utf8').catch(() => '');

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
		const helperInstance = this;
		const sourceFolder = this.sourceFolder;

		function iconHelper(name, options = {}) {

			const {SafeString} = this.instance._hbs;
			const {cache} = helperInstance;
			const opts = Object.assign({
				wrapper: true,
				wrapperClass: '',
				type: 'svg'
			}, options.hash);

			// Note: there is no filtering of the name because we trust the input
			const fileName = `${sourceFolder}/${name}.${opts.type}`;
			let contents = cache[name] || getFileContents(fileName);

			if (!contents || !contents.length) {
				name = name.toLowerCase().replace(/ /g, '-');
				console.warn('Unable to locate icon:', name);
				return new SafeString('');
			} else if (!cache[name]) {
				cache[name] = contents;
			}

			if (opts.wrapper) {
				const {wrapperClass: className} = {opts};
				const wrapperData = className ? ` class="${className}"` : '';
				contents = `<i${wrapperData}>${contents}</i>`;
			}

			return new SafeString(contents);
		}

		return {
			icon: iconHelper
		};
	}
}

module.exports = new IconHelper();
