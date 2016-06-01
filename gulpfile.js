// require gulp
var gulp = require('gulp');

// require packages
var autoprefixer = require('gulp-autoprefixer');
var concat = require('gulp-concat');
var cssnano = require('gulp-cssnano');
var plumber = require('gulp-plumber');
var rename = require('gulp-rename');
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var uncss = require('gulp-uncss');

// browser-sync
var browserSync = require('browser-sync');
var reload = browserSync.reload;

// scripts task
gulp.task('scripts', function() {
  return gulp.src('./src/js/*.js')
    .pipe(plumber())
    .pipe(concat('app.js'))
    .pipe(gulp.dest('./dist/public/js/'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/public/js/'))
    .pipe(reload({stream: true}));
});

// styles task
gulp.task('styles', function() {
  return gulp.src('./src/less/styles.less')
    .pipe(plumber())
    .pipe(less())
    .pipe(autoprefixer({ browsers: ['last 2 versions'] }))
    .pipe(gulp.dest('./dist/public/css/'))
    .pipe(cssnano())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist/public/css/'));
});

// browser sync
gulp.task('browser-sync', function() {
  browserSync.init(['./dist/public/css/*.css'], {
    server: {
      baseDir: './dist',
      routes: {
        '/2016-conference/': '/2016-conference/',
        '/about/': '/about/',
        '/projects/': '/projects/',
        '/blog/': '/blog/'
      }
    },
    notify: false,
    open: false
  });
});


gulp.task('bs-reload', function() {
  browserSync.reload();
});

// default task
gulp.task('default', ['scripts', 'styles', 'browser-sync'], function() {
  gulp.watch('./src/js/*.js', ['scripts']);
  gulp.watch('./src/less/**/*.less', ['styles']);
  gulp.watch('./dist/**/*.html', ['bs-reload']);
});
