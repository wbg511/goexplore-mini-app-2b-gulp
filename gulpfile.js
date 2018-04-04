var gulp = require('gulp');
var sass = require('gulp-sass');
var cleanCss = require('gulp-clean-css');
var rename = require('gulp-rename');

gulp.task('default', ['watch']);

gulp.task('sass', function(done) {
    gulp.src('./pages/**/*.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(rename({ extname: '.wxss' }))
        .pipe(gulp.dest('../goexplore-mini-app-2b/pages/'))
        .on('end', done);

});

gulp.task('html', function(done) {
    gulp.src('./pages/**/*.html')
        .pipe(rename({ extname: '.wxml' }))
        .pipe(gulp.dest('../goexplore-mini-app-2b/pages/'))
        .on('end', done);

});

gulp.task('pagesjs', function(done) {
    gulp.src('./pages/**/*.js')
        .pipe(rename({ extname: '.js' }))
        .pipe(gulp.dest('../goexplore-mini-app-2b/pages/'))
        .on('end', done);

});
gulp.task('servicejs', function(done) {
    gulp.src('./service/**/*.js')
        .pipe(rename({ extname: '.js' }))
        .pipe(gulp.dest('../goexplore-mini-app-2b/service'))
        .on('end', done);
});
gulp.task('utilsjs', function(done) {
    gulp.src('./utils/**/*.js')
        .pipe(rename({ extname: '.js' }))
        .pipe(gulp.dest('../goexplore-mini-app-2b/utils/'))
        .on('end', done);
});
gulp.task('configjs', function(done) {
    gulp.src('./config/*.js')
        .pipe(rename({ extname: '.js' }))
        .pipe(gulp.dest('../goexplore-mini-app-2b/config/'))
        .on('end', done);
});
gulp.task('appjs', function(done) {
    gulp.src('./app.js')
        .pipe(rename({ extname: '.js' }))
        .pipe(gulp.dest('../goexplore-mini-app-2b'))
        .on('end', done);
});
gulp.task('appjson', function(done) {
    gulp.src('./app.json')
        .pipe(rename({ extname: '.json' }))
        .pipe(gulp.dest('../goexplore-mini-app-2b'))
        .on('end', done);
});


gulp.task('json', function(done) {
    gulp.src('./pages/**/*.json')
        .pipe(rename({ extname: '.json' }))
        .pipe(gulp.dest('../goexplore-mini-app-2b/pages/'))
        .on('end', done);
});

gulp.task('watch', ['sass'], function() {
    gulp.watch(['./pages/**/*.*'], [
        'sass',
        'pagesjs',
        'html',
    ]);
    gulp.watch(['./*.*'], [
        'appjs',
        'appjson',
    ]);
    gulp.watch(['./service/**/*.*'], [
        'servicejs',
    ]);
    gulp.watch(['./config/**/*.*'], [
        'configjs',
    ]);
    gulp.watch(['./utils/**/*.*'], [
        'utilsjs',
    ]);
});