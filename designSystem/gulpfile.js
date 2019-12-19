var gulp = require('gulp');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var concat = require('gulp-concat');

//Creando una tarea
gulp.task('hello', () => {
  console.log('Hello---');
});

//Pasar de scss a css
gulp.task('sass', () => {
  return gulp.src('scss/**/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/stylesheets'))
});

//Minificar codigo css
gulp.task('style_min', () => {
  return gulp.src('scss/**/*.scss')
        .pipe(sass())
        .pipe(minifyCss())
        .pipe(concat('style_main.min.css'))
        .pipe(gulp.dest('public/stylesheets'));
});

//watch
gulp.task('watch', () => {
  //Ver cambios en los archivos y si pasa ejecutar la siguiente tarea
  gulp.watch('scss/**/*.scss', ['style_min']);
});

