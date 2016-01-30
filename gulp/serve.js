var gulp = require('gulp');
var browserSync = require('browser-sync');
var reload = browserSync.reload;

var paths = gulp.paths;

gulp.task('serve', ['styles', 'scripts', 'fonts'], function() {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: [paths.tmp, paths.src + '/app'],
      routes: {
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch([
    paths.src + '/app/*.html',
    paths.tmp + '/scripts/**/*.js',
    paths.src + '/app/images/**/*',
    paths.tmp + '/fonts/**/*'
  ]).on('change', reload);

  gulp.watch(paths.src + '/app/styles/**/*.scss', ['styles']);
  gulp.watch(paths.src + '/app/scripts/**/*.js', ['scripts']);
  gulp.watch(paths.src + '/app/fonts/**/*', ['fonts']);
  gulp.watch('bower.json', ['wiredep', 'fonts']);
});

gulp.task('serve:dist', function() {
  browserSync({
    notify: false,
    port: 9000,
    server: {
      baseDir: [paths.dist]
    }
  });
});

gulp.task('serve:test', ['scripts'], function() {
  browserSync({
    notify: false,
    port: 9000,
    ui: false,
    server: {
      baseDir: 'test',
      routes: {
        '/scripts': paths.tmp + '/scripts',
        '/bower_components': 'bower_components'
      }
    }
  });

  gulp.watch(paths.src + '/app/scripts/**/*.js', ['scripts']);
  gulp.watch(paths.src + '/test/spec/**/*.js').on('change', reload);
  gulp.watch(paths.src + '/test/spec/**/*.js', ['lint:test']);
});
