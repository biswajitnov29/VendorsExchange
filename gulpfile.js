var gulp   = require('gulp'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    less = require('gulp-less'),
    cssmin = require('gulp-cssmin'),
    plumber = require('gulp-plumber'),
    rename = require('gulp-rename');

// define the default task and add the watch task to it
gulp.task('default', ['watch']);

// configure the jshint task
gulp.task('jshint', function() {
  return gulp.src('source/javascript/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// configure which files to watch and what tasks to use on file changes
gulp.task('watch', function() {
  gulp.watch('source/javascript/**/*.js', ['jshint']);
});
gulp.task('build-css', function () {
    gulp.src('source/less/*.less')
        .pipe(plumber())
        .pipe(less())
        .pipe(gulp.dest('assets/style/'))
        .pipe(cssmin())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest('assets/style'))
    
//    return gulp.src('source/less/*.less')
//      .pipe(less('bundle.css'))
//    .pipe(gulp.dest('assets/style'))
//      .pipe(cssmin('bundle.min.css'))
//      .pipe(gulp.dest('assets/style'));

});
gulp.task('build-js', function() {
  return gulp.src('source/javascript/**/*.js')
      .pipe(sourcemaps.init())
      .pipe(concat('bundle.js'))
      .pipe(gulp.dest('assets/javascript'))
      .pipe(uglify()) 
      .pipe(sourcemaps.write())
      .pipe(rename({
            suffix: '.min'
        }))
      .pipe(gulp.dest('assets/javascript'));
});