const {src, dest, series, watch} = require('gulp');
const pug = require('gulp-pug');
const stylus = require('gulp-stylus');

/**
 * Compile pug code
 */
function compilePug() {
  return src('src/index.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(dest('public/'));
}

/**
 * Compile stylus code
 */
function compileStylus() {
  return src('src/stylus/main.styl')
    .pipe(stylus())
    .pipe(dest('public/css/'))
}

/**
 * Copy images
 */
function copyImages() {
  return src('src/images/*')
    .pipe(dest('public/images/'));
}

function watchFiles() {
  watch(['src/index.pug', 'src/pug/**/*.pug'], compilePug);
  watch('src/stylus/**/*.styl', compileStylus);
}

exports.default = series(compilePug, compileStylus,copyImages, watchFiles);