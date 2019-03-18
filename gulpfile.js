//----------------------------------//
//    Include Required Plugins      //
//----------------------------------//
const gulp        = require('gulp');
const babel       = require('gulp-babel');
const uglify      = require('gulp-uglify');
const rename      = require('gulp-rename');
const cleanUpCss  = require('gulp-clean-css');


//----------------------------------//
//  Browser Sync To reload Server   //
//----------------------------------//
const browserSync = require('browser-sync');
function serve() {
  return browserSync.init({
    server: true,
    open: true,
    port: 3000
  });
}


function copy() {
  return gulp.src([
    './src/*.html'
  ])
  .pipe(gulp.dest('./'));
}
function copyImg() {
  return gulp.src([
    './src/img/*'
  ])
  .pipe(gulp.dest('./img'));
}

function processJs() {
  return gulp.src('src/js/*.js')
  .pipe(babel({
      presets: ['env']
  }))
  .pipe(uglify())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('js'));
}

function cleanCSS() {
  return gulp.src('src/css/*.css')
  .pipe(cleanUpCss())
  .pipe(rename({
    suffix: '.min'
  }))
  .pipe(gulp.dest('css'))
  .pipe(browserSync.stream());
}

function watch() {
  browserSync.init({
    server: true,
    open: true,
    port: 3000
  });
  gulp.watch('src/js/*.js', processJs).on('change', browserSync.reload);
  gulp.watch('src/css/*.css', cleanCSS).on('change', browserSync.reload);
  gulp.watch('src/*.html').on('change', copy);
  gulp.watch('src/*.html').on('change', browserSync.reload);
}


gulp.task('copy', copy);
gulp.task('copyImg', copyImg);
gulp.task('processJs', processJs);
gulp.task('cleanCSS', cleanCSS);
gulp.task('serve', gulp.series(copy, copyImg, processJs, cleanCSS, serve));
gulp.task('watch', watch);
