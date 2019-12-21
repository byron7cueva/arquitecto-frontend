var gulp = require('gulp');
var stylus = require('gulp-stylus');

gulp.task('compile', () => {
  gulp.src('./stylus/styles.styl')
  .pipe(stylus())
  .pipe(gulp.dest('./css'));
});