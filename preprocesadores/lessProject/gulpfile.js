const {src, dest, series, watch} = require('gulp');
const pug = require('gulp-pug');
const less = require('gulp-less');

/**
 * Compile pug code
 */
function compilePug() {
  return src('src/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(dest('public/'));
}

/**
 * Compile Less
 */
function compileLess() {
  return src('src/less/main.less')
    .pipe(less())
    .pipe(dest('public/css/'));
}

/**
 * Wacth change files
 */
function watchTask() {
  watch(['src/index.pug', 'views/**/*.pug'], compilePug);
  watch('src/**/*.less', compileLess);
}

/**
 * Copy assets
 */
function copyAssets() {
  return src('src/assets/**/*')
    .pipe(dest('public/assets/'));
}

exports.default = series(compilePug, compileLess, copyAssets, watchTask);