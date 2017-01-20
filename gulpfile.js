var gulp = require('gulp');
var less = require('gulp-less');
var clean = require('gulp-clean');
var rename = require('gulp-rename');
var browserSync = require('browser-sync').create();

var webpack = require('gulp-webpack');
var webpackConfig = require('./webpack.config.js');

var buildDir = 'dist/pages';

gulp.task('less', function() {
  gulp.src('./src/pages/*/*.less')
    .pipe(less())
    .pipe(gulp.dest(buildDir))
    .pipe(rename({suffix: '.min'}))
    .pipe(clean())
    .pipe(gulp.dest(buildDir));
});

gulp.task('script', function() {
  gulp.src('./src/pages/*/*.js')
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest(buildDir)); 
});

gulp.task('dev', ['less', 'script'], function() {
  browserSync.init({    
    port: 3030,
    proxy: './src/pages'
  });
  gulp.watch('./src/pages/*/*.less', ['less']);
  gulp.watch('./src/pages/*/*.js', ['script']);
  gulp.watch('./src/pages/*/*.*').on('change', browserSync.reload);  
});