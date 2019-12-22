const gulp = require('gulp');
const pug = require('gulp-pug');

gulp.task('compile-pug', () => {
  gulp.src('./*.pug')
  .pipe(pug({
    pretty: true
  }))
  .pipe(gulp.dest('./'));
});

gulp.task('watch', () => {
  gulp.watch('./*.pug', gulp.series('compile-pug'))
});