// initialize modules
const { src, dest, series, watch } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');
const browsersync = require('browser-sync').create();

// Sass Task
function scssTask() {
    return src('app/scss/style.scss', { sourcemaps: true })
        .pipe(sass().on('error', sass.logError))
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(dest('dist', { sourcemaps: '.' }));
}

// JavaScript Task
function jsTask() {
    return src('app/js/script.js', { sourcemaps: true })
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(terser())
        .pipe(dest('dist', { sourcemaps: '.' }));
}

// BrowserSync 
function browserSyncServe(cb) {
    browsersync.init({
        server: {
            baseDir: '.',
        },
        notify: {
            styles: {
                top: 'auto',
                bottom: '0',
            },
        },
    });
    cb();
}
function browserSyncReload(cb) {
    browsersync.reload();
    cb();
}

// Watch Task
function watchTask() {
    watch('*.html', browserSyncReload);
    watch('app/scss/**/*.scss', series(scssTask, browserSyncReload));
    watch('app/js/**/*.js', series(jsTask, browserSyncReload));
}

// Default Gulp Task
exports.default = series(
    scssTask,
    jsTask,
    browserSyncServe,
    watchTask
);