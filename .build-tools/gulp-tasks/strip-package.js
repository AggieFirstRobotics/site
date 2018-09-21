'use strict';

const gulp = require('gulp');

module.exports = () => {
	// Remove unnecessary keys in theme package and copy to build
	const themePkg = Object.assign({}, require('../package.json'));
	const replace = require('gulp-replace');

	delete themePkg.scripts;
	delete themePkg.repository;
	delete themePkg.contributors;
	delete themePkg.bugs;
	delete themePkg.homepage;
	delete themePkg.devDependencies;
	delete themePkg.dependencies;
	delete themePkg.todo;

	return gulp.src('./package.json')
		.pipe(replace('.*', JSON.stringify(themePkg, null, 2)))
		.pipe(gulp.dest('./build'));
};
