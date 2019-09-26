var gulp  = require('gulp'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  cleanCss = require('gulp-clean-css'),
  rename = require('gulp-rename'),
  postcss      = require('gulp-postcss'),
  autoprefixer = require('autoprefixer'),
    ejs = require("gulp-ejs");

function buildCss() {
    return gulp.src(['scss/*.scss'])
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
        .pipe(gulp.dest('css/'))
        .pipe(cleanCss())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('css/'))
}

function buildViews() {
    return gulp.src("./src/*.ejs")
        .pipe(ejs({
            msg: "Hello Gulp!"
        }))
        .pipe(gulp.dest("./public"))
}

function watcher() {
    gulp.watch(['scss/*.scss'], gulp.series(buildViews, buildCss));
}



exports.watch = gulp.series(buildCss, buildViews, watcher);
exports.default = gulp.series(buildCss, buildViews);
