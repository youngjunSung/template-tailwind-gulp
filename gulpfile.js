const gulp = require('gulp');
const { series, src, parallel } = require('gulp');
const autoprefixer = require('gulp-autoprefixer');
const rename = require('gulp-rename');
const fileinclude = require('gulp-file-include');
const uglify = require('gulp-uglify');
const browserSync = require('browser-sync').create();
const fs = require('fs');
const prettyHtml = require('gulp-html-beautify');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const pxtorem = require('postcss-pxtorem');
const cssnano = require('cssnano');
const tailwindcss = require('tailwindcss');

const plugins = [
  tailwindcss(),
  pxtorem({
    rootValue: '10',
		propList: ['*'],
		unitPrecision: 2,
		mediaQueries: false
	}),
  cssnano(),
];

function html() {
  const options = {
    indent_size: 2,
  };
  return gulp
    .src(['./src/pages/**/*.html'], { allowEmpty: true })
    .pipe(
      fileinclude({
        prefix: '@@',
        basepath: './src/includes/',
      }),
    )
    .pipe(prettyHtml(options))
    .pipe(gulp.dest('./dist'))
    .pipe(browserSync.reload({ stream: true }))
}

function styles() {
  return (
    gulp
      .src('./src/scss/*.scss')
      .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
      .pipe(postcss(plugins))
      // .pipe(rename({ suffix: ".min" }))
      .pipe(autoprefixer())
      .pipe(gulp.dest('./dist/css'))
      .pipe(browserSync.reload({ stream: true }))
  );
}

function copyFonts() {
  return gulp.src(['./src/fonts/**']).pipe(gulp.dest('./dist/fonts'));
}
function copyImages() {
  return gulp
    .src(['./src/images/**/*'])
    .pipe(gulp.dest('./dist/images'));
}
function copyJs() {
  return gulp.src(['./src/js/**']).pipe(gulp.dest('./dist/js'));
}

function clean() {
  return new Promise((res) => {
    fs.rmdir('./dist', { recursive: true }, () => {});
    res();
  });
}

function watch() {
  gulp.watch(['./src/pages/**', './src/includes/**'], series(html, styles));
  gulp.watch('./src/css/**', series(styles));
  gulp.watch(['./src/images/**/*'], series(copyImages));
  gulp.watch('./src/js/**', series(copyJs));
  gulp.watch('./src/fonts/**', series(copyFonts));
}

function live() {
  return browserSync.init({
		port: 10,
		server: {
			baseDir: './'
		}
	})
}

exports.livewatch = parallel(live, watch);
exports.clean = clean;
exports.html = html;
exports.styles = styles;
exports.copyFonts = copyFonts;
exports.copyImages = copyImages;
exports.copyJs = copyJs;
exports.watch = watch;
exports.build = series(clean, styles, html, copyFonts, copyImages, copyJs);
