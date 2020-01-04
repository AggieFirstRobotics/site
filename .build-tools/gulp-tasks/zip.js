'use strict';
const gulp = require('gulp');

module.exports = cb => {
	const zip = require('gulp-zip');
	const {name = 'built'} = require('../../package.json');

	process.env.DIST = true;
	gulp.run('build').unwrap()(() =>
		gulp.src(['./build/**/*', '!./build/cachebust-*.json'])
			.pipe(zip(`./${name}.zip`))
			.pipe(gulp.dest('.'))
			.on('end', cb)
	);
};
