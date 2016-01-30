var gulp = require('gulp');
var browserSync = require('browser-sync');
var del = require('del');
var $ = require('gulp-load-plugins')();
var reload = browserSync.reload;

var paths = gulp.paths;

gulp.task('styles', function() {
  return gulp.src(paths.src + '/app/styles/*.scss')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sass.sync({
      outputStyle: 'expanded',
      precision: 10,
      includePaths: ['.']
    }).on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['> 1%', 'last 2 versions', 'Firefox ESR']
    }))
    .pipe($.sourcemaps.write())
    .pipe(gulp.dest(paths.tmp + '/styles'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('scripts', function() {
  return gulp.src(paths.src + '/app/scripts/**/*.js')
    .pipe($.plumber())
    .pipe($.sourcemaps.init())
    .pipe($.sourcemaps.write('.'))
    .pipe(gulp.dest(paths.tmp + '/scripts'))
    .pipe(reload({
      stream: true
    }));
});

gulp.task('html', ['styles', 'scripts'], function() {
  return gulp.src(paths.src + '/app/*.html')
    .pipe($.useref({
      searchPath: [paths.tmp, paths.src + '/app', '.']
    }))
    .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssnano()))
    .pipe($.if('*.html', $.htmlmin({
      collapseWhitespace: true
    })))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('images', function() {
  return gulp.src(paths.src + '/app/images/**/*')
    .pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{
        cleanupIDs: false
      }]
    }))
      .on('error', function(err) {
        console.log(err);
        this.end();
      })))
    .pipe(gulp.dest(paths.dist + '/images'));
});

gulp.task('fonts', function() {
  return gulp.src(require('main-bower-files')('**/*.{eot,svg,ttf,woff,woff2}', function(err) {})
    .concat(paths.src + '/app/fonts/**/*'))
    .pipe(gulp.dest(paths.tmp + '/fonts'))
    .pipe(gulp.dest(paths.dist + '/fonts'));
});

gulp.task('extras', function() {
  return gulp.src([
    paths.src + '/app/*.*',
    '!' + paths.src + '/app/*.html'
  ], {
    dot: true
  }).pipe(gulp.dest(paths.dist));
});

gulp.task('clean', del.bind(null, [paths.tmp, paths.dist]));

gulp.task('build', ['lint', 'html', 'images', 'fonts', 'extras'], function() {
  return gulp.src(paths.dist + '/**/*').pipe($.size({
    title: 'build',
    gzip: true
  }));
});
