var gulp = require("gulp");
var pug = require('gulp-pug');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var prefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var plumber = require('gulp-plumber');
var babel = require('gulp-babel');

gulp.task('css', function() {
    return gulp.src('src/templates/*.sass')
    .pipe(sass().on('error', sass.logError))
    .pipe(prefixer())
    .pipe(minifyCSS())
    .pipe(gulp.dest('build/css'))
});

gulp.task('html', function() {
    return gulp.src('src/templates/*.pug')
    .pipe(pug({
        pretty: true
    }))
    .pipe(gulp.dest('build'))
});

gulp.task('js', function() {
    return gulp.src('src/javascript/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('build/js'))
});

gulp.task('default', [ 'css', 'html', 'js']);