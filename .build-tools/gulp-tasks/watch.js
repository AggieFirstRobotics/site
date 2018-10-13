'use strict';
const run = require('run-sequence');

module.exports = () => {
	const watch = require('gulp-watch');
	const gls = require('gulp-live-server');
	const server = gls.static('build', 3000);
	let exstatic;

	run('build', () => {
		exstatic = require('./compile-files').exstatic;
	});
	server.start();
	watch('./src/**/**/*', changeObject => {
		if (!exstatic) {
			exstatic = require('./compile-files').exstatic;
		}

		let promise = Promise.resolve();

		const fileType = changeObject.extname.toLowerCase();
		console.log('Watch: updating file', fileType, changeObject.path);
		// Only refresh files, not views or partials
		if (['.hbs', '.md'].includes(fileType) && changeObject.path.indexOf('views') < 0) {
			console.log('Refreshing file', changeObject.path);
			promise = exstatic.refreshFile(changeObject.path);
		// refresh all files if a view / partial or style / script changed
		} else if (
			(['.hbs', '.md'].includes(fileType) && changeObject.path.indexOf('views') >= 0) ||
			['.css', '.scss', '.js'].includes(fileType)
		) {
			console.log('Refreshing all files');
			promise = exstatic.refreshAll();
		}

		return promise.then(() => run('build', () => server.notify([changeObject])))
	});
};
