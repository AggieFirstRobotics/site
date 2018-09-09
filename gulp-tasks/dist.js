'use strict';

const gulp = require('gulp');
const del = require('del');
const run = require('run-sequence');

module.exports = cb => {
	console.log('-------BEGIN ENV DUMP-------');
	console.log(process.env);
	console.log('--------END ENV DUMP--------');
	process.env.DIST = true;
	del.sync('dist');
	run('build', () =>
		gulp.src(['build/**/*', '!build/cachebust-*.json']).pipe(gulp.dest('./dist').on('end', cb))
	);
};
