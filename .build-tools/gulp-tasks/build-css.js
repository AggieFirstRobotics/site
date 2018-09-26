'use strict';

const gulp = require('gulp');
const cachebust = require('gulp-rev');
const del = require('del');
const swallowError = require('./util-swallow-error');
const cssnano = require('cssnano');

// Adds backwards compatibility for css properties, increases efficiency and minifies
module.exports = cb => {
	// CSS Processing assets
	const concat = require('gulp-concat'); // 2s
	const csscomb = require('gulp-csscomb');
	const sourcemaps = require('gulp-sourcemaps');
	const postcss = require('gulp-postcss');

	// CSS Processing - PostCSS assets
	const customProperties = require('postcss-custom-properties');
	const autoprefixer = require('autoprefixer');
	const mergeMedia = require('css-mqpacker');
	const mergeSelectors = require('postcss-combine-duplicated-selectors');

	const processors = [
		customProperties,
		autoprefixer({browsers: ['last 2 versions']}),
		mergeMedia(),
		mergeSelectors(),
		cssnano()
	];

	const destination = './build/assets/css';

	gulp.src(['./build/assets/sass/**/*.css'])
		.pipe(concat('styles.min.css'))
		.pipe(csscomb().on('error', swallowError))
		.pipe(sourcemaps.init())
		.pipe(postcss(processors).on('error', swallowError))
		.pipe(cachebust())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(destination))
		// Cachebust clears the file list so we have to do 2 separate writes
		.pipe(cachebust.manifest({
			path: 'cachebust-styles.json',
			base: 'build/assets',
			merge: true
		}))
		.pipe(gulp.dest(destination))
		.on('end', () => {
			// Delete unneeded sass folder
			del.sync('./build/assets/sass');
			cb();
		});
};
