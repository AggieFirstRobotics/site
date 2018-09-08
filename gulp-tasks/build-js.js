'use strict';
const gulp = require('gulp');
const cachebust = require('gulp-rev');

module.exports = function buildJS() {
	const jsUgly = require('gulp-uglify');
	const gif = require('gulp-if');
	const rmDebug = require('gulp-strip-debug');
	const order = require('gulp-order');
	const sourcemaps = require('gulp-sourcemaps');
	const concat = require('gulp-concat');

	const destination = './build/assets/js';
	let files = false;

	try {
		files = require('../src/assets/js/_config');
		if (!files || !Array.isArray(files) || files.length === 0) {
			files = false;
		}
	} catch (E) { }

	if (!files) {
		files = ['./src/assets/js/*.js', '!./src/assets/js/_config.js'];
	}

	return gulp.src(files)
		.pipe(order([
			'src/assets/js/core.js',
			'**/*.js'
		]))
		.pipe(concat('scripts.min.js'))
		.pipe(gif(process.env.DIST === 'true', rmDebug()))
		.pipe(sourcemaps.init())
		.pipe(jsUgly({toplevel: true}))
		.pipe(cachebust())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(destination))
		.pipe(cachebust.manifest({
			path: 'cachebust-scripts.json',
			base: 'build/assets'
		}))
		.pipe(gulp.dest(destination));
};
