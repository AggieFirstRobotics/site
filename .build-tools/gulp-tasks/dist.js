'use strict';

const gulp = require('gulp');
const del = require('del');

module.exports = cb => {
	console.log('-------BEGIN ENV DUMP-------');
	console.log(process.env);
	console.log('--------END ENV DUMP--------');
	process.env.DIST = true;
	del.sync('dist');
	gulp.task('build').unwrap()(() =>
		gulp.src(['build/**/*', '!build/cachebust-*.json']).pipe(gulp.dest('./dist').on('end', cb))
	);
};
