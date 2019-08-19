"use strict";

// Load plugins
const autoprefixer = require("autoprefixer");
const browsersync = require("browser-sync").create();
const cp = require("child_process");
const del = require("del");
const gulp = require("gulp");
const newer = require("gulp-newer");
const plumber = require("gulp-plumber");
const postcss = require("gulp-postcss");
const sass = require("gulp-sass");
const sourcemaps = require("gulp-sourcemaps");
const spawn = process.platform === "win32" ? require("win-spawn") : require("child_process").spawn;
const webpack = require("webpack");
const webpackconfig = require("./webpack.config.js");
const webpackstream = require("webpack-stream");

// BrowserSync
function browserSync(done) {
    browsersync.init({
        server: "./dist",
        port: "4000"
    });
    done();
}


// BrowserSync Reload
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

// Clean assets
function clean() {
    return del(["./dist/"]);
}

// CSS task
function css() {
    return gulp.src("./src/sass/*.scss")
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass({outputStyle: "expanded"}).on('error', sass.logError))
        .pipe(gulp.dest("./dist/assets/css/"))
        //.pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write("./maps"))
        .pipe(gulp.dest("./dist/assets/css/"))
        .pipe(browsersync.stream());
}

// Transpile, concatenate and minify scripts
function scripts() {
    return (
        gulp
            .src(["./src/js/**/*"])
            .pipe(plumber())
            .pipe(webpackstream(webpackconfig, webpack))
            // folder only, filename is specified in webpack config
            .pipe(gulp.dest("./dist/assets/js/"))
            .pipe(browsersync.stream())
    );
}

function copyJquery() {
    return (
        gulp
            .src(["./src/js/jQuery/*"])
            .pipe(gulp.dest("./dist/assets/js/jquery"))
    )
}

function copyStaticJs() {
    return (
        gulp
            .src(["./src/js/editmode", "./src/js/diverse"])
            .pipe(gulp.dest("./dist/assets/js/"))
    )
}

const copyStatic = gulp.series(copyJquery, copyStaticJs);


// Jekyll
function jekyll() {
    return cp.spawn("jekyll.bat", ["build", "-I"], {stdio: "inherit"});
}


// Watch files
function watchFiles() {
    gulp.watch("./src/sass/**/*", css);
    gulp.watch("./src/js/**/*", scripts);
    gulp.watch("./src/jekyll/**/*", gulp.series(jekyll, browserSyncReload));
}

const watch = gulp.series(clean, gulp.parallel(css, scripts, jekyll), gulp.parallel(watchFiles, browserSync));

const build = gulp.series(clean, gulp.parallel(css, scripts, copyStatic, jekyll));

// export tasks
exports.css = css;
exports.scripts = scripts;
exports.jekyll = jekyll;
exports.clean = clean;
exports.watch = watch;
exports.default = watch;
exports.copyJquery = copyJquery;
exports.copyStaticJs = copyStaticJs;
exports.copyStatic = copyStatic
exports.build = build;

// TODO: copy static files (jquery and diverse)