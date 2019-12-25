const {src, dest, series, watch} = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');

/**
 * Compile Pug
 */
function compilePug() {
  return src('src/pug/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(dest('public/html/'));
}

/**
 * Compile Sass
 */
function compileSass() {
  return src('src/sass/main.scss')
    .pipe(sass())
    .pipe(dest('public/css/'))
}

/**
 * Copy Images
 */
function copyImages() {
  return src('src/images/*')
    .pipe(dest('public/images/'));
}

/**
 * Watch files
 */
function watchFiles() {
  watch('src/pug/**/*.pug', compilePug);
  watch('src/sass/**/*.scss', compileSass);
}

exports.default = series(compilePug, compileSass, copyImages, watchFiles);