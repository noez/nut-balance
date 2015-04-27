'us strict';

var gulp       = require('gulp');
var $          = require('gulp-load-plugins')();
var bowerFiles = require('main-bower-files');
var del        = require('del');

var AUTOPREFIXER_BROWSERS = [
  'ie >= 8',
  'ie_mob >= 10',
  'ff >= 30',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];


gulp.task('styles', function(){
  return gulp.src('src/styles/main.scss')
    .pipe($.plumber())
    .pipe($.sass())
    .pipe($.autoprefixer({ browsers: AUTOPREFIXER_BROWSERS}))
    .pipe(gulp.dest('public/styles'))
    .pipe($.livereload());
});

gulp.task('connect', function(){
  var connect = require('connect');
  var http = require('http');
  var app = connect();
  var serverStatic = require('serve-static');

  app
    .use(require('connect-livereload')({
      port : 35729 
    }))
    .use(serverStatic('./public'));

    http.createServer(app).listen(3000);
});

gulp.task('serve',['connect'], function(){
  require('opn')('http://localhost:3000');
});

gulp.task('watch',['connect','serve'],function(){
  $.livereload.listen();
  gulp.watch('src/styles/**/*.scss', ['styles']);
});



