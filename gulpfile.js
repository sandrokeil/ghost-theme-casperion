// Load Gulp Plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache');

// Styles
gulp.task('styles', function() {
    return gulp.src('src/assets/css/main.scss')
        //.pipe(sass({ style: 'expanded' }))
        //.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        //.pipe(gulp.dest('assets/css'))
        //.pipe(rename({ suffix: '.min' }))
        //.pipe(minifycss())

        .pipe(sass({style: 'expanded', quiet: true, cacheLocation: '.sass-cache'}))
        .pipe(gulp.dest('assets/css'))
        .pipe(minifycss({keepSpecialComments: 0}))
        .pipe(rename({suffix: '.min'}))

        .pipe(gulp.dest('assets/css'))
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
    return gulp.src([
        'src/assets/js/**/*.js'])
        //.pipe(jshint('.jshintrc'))
        //.pipe(jshint.reporter('default'))
        .pipe(concat('casperion.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('images', function() {
    return gulp.src('src/assets/images/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('assets/images'))
        .pipe(notify({ message: 'Images task complete' }));
});

// Default task
gulp.task('default', function() {
    gulp.start('styles', 'scripts');
});

// Watch
gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch('src/assets/css/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('src/assets/js/**/*.js', ['scripts']);

    // Watch image files
    //gulp.watch('src/assets/images/**/*', ['images']);
});
