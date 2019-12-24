const {src, dest, series, watch} = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass');

/**
 * Compile Pug
 */
function compilePug() {
  return src('src/index.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(dest('public/'));
}

/**
 * Compile Sass
 */
function compileSass() {
  return src('src/sass/main.sass')
    .pipe(sass())
    .pipe(dest('public/css/'));
}

/**
 * Copy images to public path
 */
function copyImages() {
  return src('src/images/*')
    .pipe(dest('public/images/'));
}

/**
 * Watch change in files
 */
function watchFiles() {
  watch(['src/index.pug', 'src/pug/**/*.pug'], compilePug);
  watch('src/sass/**/*.sass', compileSass);
}

exports.default = series(compilePug, compileSass, copyImages, watchFiles);