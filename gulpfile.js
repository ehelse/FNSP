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

// Copy SVGs
function svg() {
    return gulp.src("./src/svg/**/*").pipe(gulp.dest("./dist/assets/Images/Theme/"));
}

// Copy prototype images
function protoimg() {
    return gulp.src("./src/jekyll/_images/**/*").pipe(gulp.dest("./dist/assets/Images/"));
}

// Jekyll
function jekyll() {
    return cp.spawn("jekyll.bat", ["build", "-I"], {stdio: "inherit"});
}


// Watch files
function watchFiles() {
    gulp.watch("./src/sass/**/*", css);
    gulp.watch("./src/js/**/*", scripts);
    gulp.watch("./src/svg/**/*", svg);
    gulp.watch("./src/jekyll/**/*", gulp.series(jekyll, browserSyncReload));
}

const watch = gulp.series(clean, gulp.parallel(css, scripts, jekyll), protoimg, svg, gulp.parallel(watchFiles, browserSync));

const build = gulp.series(clean, gulp.parallel(css, scripts, jekyll), protoimg, svg);

// export tasks
exports.css = css;
exports.scripts = scripts;
exports.jekyll = jekyll;
exports.clean = clean;
exports.watch = watch;
exports.default = watch;
exports.build = build;
exports.svg = svg;
exports.protoimg = protoimg;