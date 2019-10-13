const { src, dest, series } = require('gulp');
const gulpRename = require("gulp-rename");
const gulpPostcss = require('gulp-postcss');
const gulpClean = require('gulp-clean');
const gulpStringReplace = require('gulp-string-replace');
const sugarss = require('sugarss');

const SRC_PATH = '../uaprom/uaprom/cs/packages/content/portable/';
const VARS_MAP = require('./vars-map.json');

function convertSSS() {
    const plugins = [
        require('postcss-variables')({ globals: VARS_MAP }),
        require('postcss-nested'),
        require('postcss-extend'),
        require('postcss-color-function'),
        require('postcss-automath'),
    ];

    return src(SRC_PATH + '**/*.sss')
        .pipe(gulpClean({ force: true }))
        .pipe(gulpPostcss(plugins, { parser: sugarss }))
        .pipe(gulpRename({ extname: '.css'}))
        .pipe(dest(SRC_PATH));
}

function changeImportSSS() {
    return src([SRC_PATH + '**/*.js', SRC_PATH + '**/*.jsx'])
        .pipe(gulpStringReplace(".sss'", ".css'"))
        .pipe(dest(SRC_PATH));
}

exports.default = series(convertSSS, changeImportSSS);