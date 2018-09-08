'use strict';
const gulp = require('gulp');

module.exports = () => {
	const sass = require('gulp-sass');
	return gulp.src('./src/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('./build'));
};
