// Include Gulp
var gulp = require('gulp');

// Include Plugins
var eslint       = require('gulp-eslint');
var sass         = require('gulp-sass');
var concat       = require('gulp-concat');
var uglify       = require('gulp-uglify');
var plumber      = require('gulp-plumber');
var gulpUtil     = require('gulp-util');
var rename       = require('gulp-rename');
var sourcemaps   = require('gulp-sourcemaps');
var postcss      = require('gulp-postcss');
var autoprefixer = require('autoprefixer');
var pixrem       = require('pixrem');
var cssnano      = require('cssnano');
var browserSync  = require('browser-sync').create();

// make noise on js and scss errors
function errorHandler() {
    gulpUtil.beep();
    return true;
}

// Lint JS-Files
gulp.task('lint', function () {
    return gulp
        .src('../src/js/**.js')
        .pipe(eslint({
            configFile: '.eslintrc.js'
        }))
        .pipe(eslint.format())
        .pipe(eslint.failAfterError());
});

// Concatenate & Minify JS
gulp.task('scripts', function () {
    return gulp
        .src([
            '../src/js/globals/**.js',
            '../src/js/**.js'
        ])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('../js'))
        .pipe(rename('main.min.js'))
        .pipe(plumber(errorHandler))
        .pipe(uglify())
        .pipe(plumber.stop())
        .pipe(gulp.dest('../js'));
});

// Copy & Minify Vendor JS
gulp.task('scripts-vendor', function () {
    return gulp
        .src([
            '../src/js/vendor/**.js'
        ])
        .pipe(gulp.dest('../js/vendor'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(plumber(errorHandler))
        .pipe(uglify())
        .pipe(plumber.stop())
        .pipe(gulp.dest('../js/vendor'));
});

// Compile Main-Sass and create CSS-File
gulp.task('sass', function () {
    return gulp
        .src('../src/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber(errorHandler))
        .pipe(sass({
            outputStyle: 'expanded',
            errLogToConsole: true
        }).on('error', sass.logError))
        .pipe(plumber.stop())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('../'))
        .pipe(browserSync.stream());
});

// Minify & Autoprefix CSS
gulp.task('css', function () {
    var processors = [
        pixrem(),
        autoprefixer({
            browsers: ['last 4 versions', 'android 4', 'opera 12']
        }),
        cssnano()
    ];
    return gulp
        .src('../style.css')
        .pipe(postcss(processors))
        .pipe(rename('style.min.css'))
        .pipe(gulp.dest('../'));
});

// Compile Login-Sass and create CSS-File
gulp.task('login-sass', function () {
    return gulp
        .src('../src/scss/wp-backend/login/style-login.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber(errorHandler))
        .pipe(sass({
            outputStyle: 'expanded',
            errLogToConsole: true
        }).on('error', sass.logError))
        .pipe(plumber.stop())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('../'))
        .pipe(browserSync.stream());
});

// Minify & Autoprefix Login-CSS
gulp.task('login-css', function () {
    var processors = [
        pixrem(),
        autoprefixer({
            browsers: ['last 4 versions', 'android 4', 'opera 12']
        }),
        cssnano()
    ];
    return gulp
        .src('../style-login.css')
        .pipe(postcss(processors))
        .pipe(rename('style-login.min.css'))
        .pipe(gulp.dest('../'))
        .pipe(browserSync.stream());
});

// Compile Tinymce-Sass and create CSS-File
gulp.task('tinymce-sass', function () {
    return gulp
        .src('../src/scss/wp-backend/style-tinymce.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber(errorHandler))
        .pipe(sass({
            outputStyle: 'expanded',
            errLogToConsole: true
        }).on('error', sass.logError))
        .pipe(plumber.stop())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('../'))
        .pipe(browserSync.stream());
});

// Minify & Autoprefix Tinymce-CSS
gulp.task('tinymce-css', function () {
    var processors = [
        pixrem(),
        autoprefixer({
            browsers: ['last 4 versions', 'android 4', 'opera 12']
        }),
        cssnano()
    ];
    return gulp
        .src('../style-tinymce.css')
        .pipe(postcss(processors))
        .pipe(rename('style-tinymce.min.css'))
        .pipe(gulp.dest('../'))
        .pipe(browserSync.stream());
});

// Compile Backend-Sass and create CSS-File
gulp.task('theme-sass', function () {
    return gulp
        .src('../src/scss/wp-backend/theme/style-theme.scss')
        .pipe(sourcemaps.init())
        .pipe(plumber(errorHandler))
        .pipe(sass({
            outputStyle: 'expanded',
            errLogToConsole: true
        }).on('error', sass.logError))
        .pipe(plumber.stop())
        .pipe(sourcemaps.write('maps'))
        .pipe(gulp.dest('../'))
        .pipe(browserSync.stream());
});

// Minify & Autoprefix Backend-CSS
gulp.task('theme-css', function () {
    var processors = [
        pixrem(),
        autoprefixer({
            browsers: ['last 4 versions', 'android 4', 'opera 12']
        }),
        cssnano()
    ];
    return gulp
        .src('../style-theme.css')
        .pipe(postcss(processors))
        .pipe(rename('style-theme.min.css'))
        .pipe(gulp.dest('../'))
        .pipe(browserSync.stream());
});

// Watch Files For Changes
gulp.task('watch', function () {
    browserSync.init({
        proxy: 'b-wp-gulp.dev'
    });
    gulp
        .watch('../src/js/**/*.js', ['lint', 'scripts', 'scripts-vendor'])
        .on('change', browserSync.reload);
    gulp.watch('../src/scss/**/*.scss', ['sass', 'login-sass', 'tinymce-sass', 'theme-sass']);
    gulp.watch('../**/*.php').on('change', browserSync.reload);
});

// Default Tasks
gulp.task('default', ['sass', 'login-sass', 'tinymce-sass', 'theme-sass', 'scripts', 'scripts-vendor', 'watch']);

// Build
gulp.task('build', ['sass', 'login-sass', 'tinymce-sass','theme-sass', 'css', 'login-css', 'tinymce-css', 'theme-css', 'lint', 'scripts', 'scripts-vendor']);
