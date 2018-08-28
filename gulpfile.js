var gulp = require('gulp');

// gulp plugins and utils
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');
var postcss = require('gulp-postcss');
var sourcemaps = require('gulp-sourcemaps');
var zip = require('gulp-zip');
var rename = require('gulp-rename');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// postcss plugins
var autoprefixer = require('autoprefixer');
var colorFunction = require('postcss-color-function');
var cssnano = require('cssnano');
var customProperties = require('postcss-custom-properties');
var easyimport = require('postcss-easy-import');

var swallowError = function swallowError(error) {
    gutil.log(error.toString());
    gutil.beep();
    this.emit('end');
};

var nodemonServerInit = function () {
    livereload.listen(1234);
};

gulp.task('build', ['css', 'scripts'], function (/* cb */) {
    return nodemonServerInit();
});

gulp.task('css', function () {
    var processors = [
        easyimport,
        customProperties,
        colorFunction(),
        autoprefixer({browsers: ['last 2 versions']}),
        cssnano()
    ];

    return gulp.src(
        [
            'assets/css/screen.css',
            'assets/css/search.css',
            'assets/css/darcula.css',
        ]
    )
        .on('error', swallowError)
        .pipe(concat('casperion.css'))
        // .pipe(sourcemaps.init())
        .pipe(postcss(processors))
        .pipe(rename({suffix: '.min'}))
        // .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('assets/css/'))
        .pipe(livereload());
});

gulp.task('watch', function () {
    gulp.watch('assets/css/**', ['css']);
});

gulp.task('zip', ['css', 'scripts'], function () {
    var targetDir = 'dist/';
    var themeName = require('./package.json').name;
    var filename = themeName + '.zip';

    return gulp.src([
        '**',
        '!node_modules', '!node_modules/**',
        '!dist', '!dist/**'
    ])
        .pipe(zip(filename))
        .pipe(gulp.dest(targetDir));
});

gulp.task('default', ['build'], function () {
    gulp.start('watch');
});

gulp.task('scripts', function() {
    return gulp.src([
        'assets/js/infinitescroll.js',
        'assets/js/jquery.fitvids.js',
        'assets/js/search.js',
        'assets/js/jquery.ghosthunter.js',
        ]
    )
    //.pipe(jshint('.jshintrc'))
    //.pipe(jshint.reporter('default'))
        .pipe(concat('casperion.js'))
        .pipe(gulp.dest('assets/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('assets/js'));
});