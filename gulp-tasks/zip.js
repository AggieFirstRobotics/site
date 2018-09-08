'use strict';
const gulp = require('gulp');
const run = require('run-sequence');

module.exports = cb => {
	const zip = require('gulp-zip');
	const pkg = require('../package.json');

	process.env.DIST = true;
	run('build', () =>
		gulp.src(['./build/**/*', '!./build/cachebust-*.json'])
			.pipe(zip(`./${pkg.name || 'built'}.zip`))
			.pipe(gulp.dest('.'))
			.on('end', cb)
	);
};
