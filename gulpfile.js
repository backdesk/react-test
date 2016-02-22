/**
 * Faster Browserify + Babelify using Watchify
 * See: https://gist.github.com/james-gardner/af806f112799692eda85
 */
var gulp = require('gulp')
  , gutil = require('gutil')
  , browserify = require('browserify')
  , babelify = require('babelify')
  , watchify = require('watchify')
  , sass = require('gulp-sass')
  , source = require('vinyl-source-stream')
  , uglify = require('gulp-uglify')
  , buffer = require('vinyl-buffer');


var pkg = require('./package.json');


// Wrap around call to bundle so it can be re-used for update calls.
var bundle = function (bundler) {
  bundler.bundle()
    .on('error', function(err) { gutil.log(err); this.emit('end'); })
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
};

// Copy over the index.html to dist. This will only happen on the initial run.
gulp.task('html', function() {
  return gulp.src(['src/*.html'])
    .pipe(gulp.dest('./dist'));
});

// Compile and distribute css from scss.
gulp.task('scss', function () {
  gulp.src('src/scss/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'));
});

// Watcher for scss changes.
gulp.task('watch-scss', function () {
  return gulp.watch('src/scss/**/*.scss', ['scss']);
});

// Watchify on browserify with default caching options (watchify.args).
gulp.task('js', function () {
  var bundler = watchify(browserify(pkg.main, watchify.args).transform(babelify));

  // Initial call.
  bundle(bundler);

  // Call on update.
  bundler.on('update', function() {
    bundle(bundler);
  });
});

gulp.task('default', ['html', 'scss', 'watch-scss', 'js']);