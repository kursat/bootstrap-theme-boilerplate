var gulp  = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  cleanCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  postcss      = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
    ejs = require("gulp-ejs");

function buildCss() {
    return gulp.src(['src/scss/*.scss'])
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([ autoprefixer({ browsers: [
                'Chrome >= 35',
                'Firefox >= 38',
                'Edge >= 12',
                'Explorer >= 10',
                'iOS >= 8',
                'Safari >= 8',
                'Android 2.3',
                'Android >= 4',
                'Opera >= 12']})]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('public/css'))
        .pipe(cleanCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('public/css'))
}

function buildViews() {
    return gulp.src("src/[A-Za-z]*.ejs")
        .pipe(ejs({
            msg: "Hello Gulp!"
        }))
        .pipe(rename({ extname: '.html' }))
        .pipe(gulp.dest("public"))
}

function copyJs() {
    return gulp
        .src(['src/js/**/*'])
        .pipe(gulp.dest('public/js'));
}

function watcher() {
    gulp.watch(['src/*.*'], gulp.series(buildViews, buildCss, copyJs));
}

exports.watch = gulp.series(buildCss, buildViews, copyJs, watcher);
exports.default = gulp.series(buildCss, buildViews, copyJs);
