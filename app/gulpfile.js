let 
    gulp = require('gulp'),
    gp = require('gulp-load-plugins')(),
    browserSync = require('browser-sync').create();
    
gulp.task('serve', () => {
    browserSync.init({
        server: {
            baseDir: '../'
        }
    });
});

gulp.task('pug', () => {
    return gulp.src('pug/pages/*.pug')
        .pipe(gp.pug({
            pretty: true
        }))
        .pipe(gulp.dest('../'))
        .pipe(browserSync.reload({
            stream: true
        }));
});

gulp.task('stylus', () => {
    return gulp.src('static/stylus/main.styl')
    .pipe(gp.sourcemaps.init())
    .pipe(gp.stylus({
        'include css': true
    }))
    .pipe(gp.autoprefixer({
        browsers: ['last 3 versions'],
        cascade: false
    }))
    .on('error', gp.notify.onError({
        title: 'style'
    }))
    .pipe(gp.csso())
    .pipe(gp.sourcemaps.write())
    .pipe(gulp.dest('../dist/css/'))
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task('scripts', () => {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
        'static/js/vendors/*.js',
        'static/js/scripts/**/*.js'
    ])
    .pipe(gp.concat('app.js'))
    .pipe(gulp.dest('../dist/js/'))
    .pipe(browserSync.reload({
        stream: true
    }));
});

gulp.task('img:dev', () =>
    gulp.src('static/img/**/*.*')
        .pipe(gulp.dest('../dist/img/'))
);

gulp.task('img:build', () =>
    gulp.src('static/img/**/*.*')
        .pipe(gp.imagemin([
            gp.imagemin.gifsicle({interlaced: true}),
            gp.imagemin.jpegtran({progressive: true}),
            gp.imagemin.optipng({optimizationLevel: 5})
        ]))
        .pipe(gulp.dest('../dist/img/'))
);

gulp.task('fonts', () =>
    gulp.src('static/fonts/**/*.*')
        .pipe(gulp.dest('../dist/fonts/'))
);

gulp.task('watch', () => {
    gulp.watch('pug/**/*.pug', gulp.series('pug'))
    gulp.watch('static/stylus/**/*.styl', gulp.series('stylus'))
    gulp.watch('static/js/**/*.js', gulp.series('scripts'))
});

gulp.task('default', gulp.series(
    gulp.parallel('pug', 'stylus', 'scripts', 'fonts', 'img:dev'),
    gulp.parallel('watch', 'serve')
));

gulp.task('build', gulp.series(
    'pug',
    'stylus',
    'scripts',
    'fonts',
    'img:build'
));