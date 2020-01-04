'use strict';
const gulp = require('gulp');

module.exports = () => {
	const watch = require('gulp-watch');
	const gls = require('gulp-live-server');
	const server = gls.static('build', 3000);
	const icon = require('../exstatic-plugins/icon');
	let exstatic;

	gulp.task('build').unwrap()(() => {
		exstatic = require('./compile-files').exstatic;
	});
	server.start();
	watch('./src/**/**/*', changeObject => {
		if (!exstatic) {
			exstatic = require('./compile-files').exstatic;
		}

		let promise = Promise.resolve();

		const fileType = changeObject.extname.toLowerCase();
		const path = changeObject.path.replace(/\\/g, '/');
		console.log('Watch: updating file', fileType, path);
		// Only refresh files, not views or partials
		if (['.hbs', '.md'].includes(fileType) && path.indexOf('views') < 0) {
			console.log('Refreshing file', path);
			promise = exstatic.refreshFile(path);
		// refresh all files if a view / partial or style / script changed
	} else if (
		(['.hbs', '.md'].includes(fileType) && path.indexOf('views') >= 0) ||
		['.css', '.scss', '.js'].includes(fileType) ||
		path.indexOf('assets/icons') > 0
		) {
			if (path.indexOf('assets/icons') > 0) {
				console.log('Clearing icon cache');
				icon.clearCache();
			}

			console.log('Refreshing all files');
			promise = exstatic.refreshAll();
		}

		return promise.then(() => run('build', () => server.notify([changeObject])))
	});
};
