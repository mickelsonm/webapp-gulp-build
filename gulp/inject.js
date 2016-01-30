var gulp = require('gulp');
var wiredep = require('wiredep');

var paths = gulp.paths;

// inject bower components
gulp.task('wiredep', function() {
  gulp.src(paths.src + '/app/styles/*.scss')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)+/
    }))
    .pipe(gulp.dest('app/styles'));

  gulp.src(paths.src + '/app/*.html')
    .pipe(wiredep({
      exclude: ['bootstrap-sass'],
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest(paths.src + '/app'));
});
