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
  watch(['src/index.pug', 'src/pug/**/*.pug'], compilePug);
  watch('src/**/*.less', compileLess);
}

/**
 * Copy assets
 */
function copyImages() {
  return src('src/images/*')
    .pipe(dest('public/images/'));
}

exports.default = series(compilePug, compileLess, copyImages, watchTask);