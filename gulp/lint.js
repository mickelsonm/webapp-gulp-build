var gulp = require('gulp');
var browserSync = require('browser-sync');
var $ = require('gulp-load-plugins')();
var reload = browserSync.reload;

var paths = gulp.paths;

var testLintOptions = {
  env: {
    mocha: true
  }
};

gulp.task('lint', function() {
  lint(paths.src + '/app/scripts/**/*.js');
});

gulp.task('lint:test', function() {
  lint(paths.src + '/test/spec/**/*.js', testLintOptions);
});

function lint(files, options) {
  return gulp.src(files)
    .pipe(reload({
      stream: true,
      once: true
    }))
    .pipe($.eslint(options))
    .pipe($.eslint.format())
    .pipe($.if(!browserSync.active, $.eslint.failAfterError()));
}
