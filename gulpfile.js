const GULP_TASK_FOLDER = './.build-tools/gulp-tasks'
'use strict';
/* eslint-disable max-statements-per-line, brace-style */
const gulp = require('gulp');
const del = require('del');

const swallowError = require(`${GULP_TASK_FOLDER}/util-swallow-error`);

const buildSass = require(`${GULP_TASK_FOLDER}/build-sass`);
const buildCSS = require(`${GULP_TASK_FOLDER}/build-css`);
const buildJS = require(`${GULP_TASK_FOLDER}/build-js`);
const compileFiles = require(`${GULP_TASK_FOLDER}/compile-files`);
const copyAssets = require(`${GULP_TASK_FOLDER}/copy-assets`);
const buildForDist = require(`${GULP_TASK_FOLDER}/dist`);
const zipDist = require(`${GULP_TASK_FOLDER}/zip`);
const watch = require(`${GULP_TASK_FOLDER}/watch`);
const generateConfig = require(`${GULP_TASK_FOLDER}/generate-config`);
const headers = require(`${GULP_TASK_FOLDER}/headers`);

gulp.on('err', swallowError);

gulp.task('clean-build', cb => del('./build/**/*').then(r => cb(null, r)));
gulp.task('sass', () => buildSass());
gulp.task('css', cb => {buildCSS(cb);});
gulp.task('js', () => buildJS());
gulp.task('compile-files', cb => {compileFiles(cb);});
gulp.task('copy-assets', () => copyAssets());
gulp.task('dist', cb => {buildForDist(cb);});
gulp.task('zip', cb => {zipDist(cb);});
gulp.task('watch', () => watch());
gulp.task('default', gulp.series('watch'));
gulp.task('generate-config', () => generateConfig());
gulp.task('headers', headers);

gulp.task('build', gulp.series('clean-build', 'generate-config', 'sass', gulp.parallel('css', 'js'), 'copy-assets', 'compile-files', 'headers'));
