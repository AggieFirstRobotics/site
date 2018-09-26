'use strict';

const gulp = require('gulp');
const changed = require('gulp-changed');

module.exports = () => {
	// DON'T copy css or js - they're built separately
	return gulp.src(['./src/assets/**/*', '!./src/assets/js/**/*', '!./src/assets/sass/**/*'])
		.pipe(changed('./build/assets'))
		.pipe(gulp.dest('./build/assets'));
};
