var gulp = require('gulp');
var less = require('gulp-less');

gulp.task('compile', () => {
  gulp.src('./less/styles.less')
  .pipe(less())
  .pipe(gulp.dest('./css'));
});