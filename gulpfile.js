'use strict';
/* eslint-disable max-statements-per-line, brace-style */
const gulp = require('gulp');
const run = require('run-sequence');
const del = require('del');

const swallowError = require('./gulp-tasks/util-swallow-error');

const buildSass = require('./gulp-tasks/build-sass');
const buildCSS = require('./gulp-tasks/build-css');
const buildJS = require('./gulp-tasks/build-js');
const compileFiles = require('./gulp-tasks/compile-files');
const copyAssets = require('./gulp-tasks/copy-assets');
const stripPackage = require('./gulp-tasks/strip-package');
const buildForDist = require('./gulp-tasks/dist');
const zipDist = require('./gulp-tasks/zip');
const syncDist = require('./gulp-tasks/sync');
const watch = require('./gulp-tasks/watch');

gulp.on('err', swallowError);

gulp.task('clean-build', () => del.sync('./build/**/*'));
gulp.task('sass', () => buildSass());
gulp.task('css', cb => {buildCSS(cb);});
gulp.task('js', () => buildJS());
gulp.task('compile-files', cb => {compileFiles(cb);});
gulp.task('copy-assets', () => copyAssets());
gulp.task('strip-package', () => stripPackage());
gulp.task('dist', cb => {buildForDist(cb);});
gulp.task('zip', cb => {zipDist(cb);});
gulp.task('default', () => run('watch'));
gulp.task('sync', cb => {syncDist(cb);});
gulp.task('watch', () => watch());

gulp.task('build', cb => {
	run('clean-build', 'sass', ['css', 'js'], 'copy-assets', 'compile-files', 'strip-package', cb);
});
