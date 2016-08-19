/**
 * gulpfile.babel.js - w3bp
 * 
 * Licensed under MIT.
 * Copyright (C) 2016 Karim Alibhai.
 */

const gulp = require('gulp'),
      plugins = require('gulp-load-plugins')(),
      browserSync = require('browser-sync').create();

gulp.task('lint', () =>
    gulp.src(['src/js/**.js'])
        .pipe(plugins.eslint())
        .pipe(plugins.eslint.format())
        .pipe(plugins.eslint.failAfterError())
);

gulp.task('compile:js', ['lint'], () =>
    gulp.src(['src/js/**.js'])
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.babel({
            presets: ['es2015']
        }))
        .pipe(plugins.uglify({ preserveComments: 'license' }))
        .pipe(plugins.rename({ extname: '.min.js' }))
        .pipe(plugins.sourcemaps.write('./'))
        .pipe(gulp.dest('dist/js'))
);

gulp.task('compile:html', () =>
    gulp.src(['src/**/**.pug'])
        .pipe(plugins.pug())
        .pipe(gulp.dest('dist'))
);

gulp.task('default', ['compile:html', 'compile:js']);

gulp.task('watch', () => {
    browserSync.init({
        server: {
            baseDir: './dist'
        }
    });

    gulp.watch('src/js/**.js', ['compile:js']).on('change', browserSync.reload);
    gulp.watch('src/**/**.pug', ['compile:html']).on('change', browserSync.reload);
});