'use strict';

const gulp = require('gulp');
const del = require('del');
const run = require('run-sequence');

module.exports = cb => {
	process.env.DIST = true;
	del.sync('dist');
	run('build', () =>
		gulp.src(['build/**/*', '!build/cachebust-*.json']).pipe(gulp.dest('./dist').on('end', cb))
	);
};
