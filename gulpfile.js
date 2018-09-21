const GULP_TASK_FOLDER = './.bufild-tools/gulp-tasks'
'use strict';
/* eslint-disable max-statements-per-line, brace-style */
const gulp = require('gulp');
const run = require('run-sequence');
const del = require('del');

const swallowError = require(`${GULP_TASK_FOLDER}/util-swallow-error`);

const buildSass = require(`${GULP_TASK_FOLDER}/build-sass`);
const buildCSS = require(`${GULP_TASK_FOLDER}/build-css`);
const buildJS = require(`${GULP_TASK_FOLDER}/build-js`);
const compileFiles = require(`${GULP_TASK_FOLDER}/compile-files`);
const copyAssets = require(`${GULP_TASK_FOLDER}/copy-assets`);
const stripPackage = require(`${GULP_TASK_FOLDER}/strip-package`);
const buildForDist = require(`${GULP_TASK_FOLDER}/dist`);
const zipDist = require(`${GULP_TASK_FOLDER}/zip`);
const syncDist = require(`${GULP_TASK_FOLDER}/sync`);
const watch = require(`${GULP_TASK_FOLDER}/watch`);

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
