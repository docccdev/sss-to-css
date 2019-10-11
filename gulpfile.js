const path = require('path');
const { src, dest, series } = require('gulp');
const rename = require("gulp-rename");
const postcss = require('gulp-postcss');
const sugarss = require('sugarss');
const variables = require('postcss-variables');
const clean = require('gulp-clean');
const gulpStringReplace = require('gulp-string-replace');
const nested = require('postcss-nested');

const pathFolder = '../uaprom/uaprom/cs/packages/content/portable/';
// const pathFolder = './source/';

const globalVars = {
    'min-340': '(--min-340)', 
    'min-375': '(--min-375)', 
    'min-480': '(--min-480)', 
    'min-640': '(--min-640)',
    'min-768': '(--min-768)',
    'min-951': '(--min-951)',
    'min-1000': '(--min-1000)',
    'min-1024': '(--min-1024)',
    'min-1024-landscape': '(--min-1024-landscape)',
    'min-1025': '(--min-1025)',
    'min-1200': '(--min-1200)',
    'min-1240': '(--min-1240)',
    'min-1254': '(--min-1254)',
    'min-1500': '(--min-1500)',
    'min-1510': '(--min-1510)',
    'portrait': '(--portrait)',
    'landscape': '(--landscape)',

    'content-color': 'var(--content-color)',
    'purple': 'var(--purple)',
    'dark-blue': 'var(--dark-blue)',
    'coral': 'var(--coral)',
    'orange': 'var(--orange)',
    'red': 'var(--red)',
    'green': 'var(--green)',
    'yellow': 'var(--yellow)',
    'bright-yellow': 'var(--bright-yellow)',
    'pale-yellow': 'var(--pale-yellow)',
    'pale-grey': 'var(--pale-grey)',
    'light-grey': 'var(--light-grey)',
    'blue': 'var(--blue)',
    'blueberry': 'var(--blueberry)',
    'grey': 'var(--grey)',
    'sky-blue': 'var(--sky-blue)',
    'purple-gradient-start': 'var(--purple-gradient-start)',
    'purple-gradient-stop': 'var(--purple-gradient-stop)',
    'coral-gradient-start': 'var(--coral-gradient-start)',
    'coral-gradient-stop': 'var(--coral-gradient-stop)',
    'blue-gradient-start': 'var(--blue-gradient-start)',
    'blue-gradient-stop': 'var(--blue-gradient-stop)',
    'dark-blue-gradient-start': 'var(--dark-blue-gradient-start)',
    'dark-blue-gradient-stop': 'var(--dark-blue-gradient-stop)',
    'green-gradient-start': 'var(--green-gradient-start)',
    'green-gradient-stop': 'var(--green-gradient-stop)',
    'orange-gradient-start': 'var(--orange-gradient-start)',
    'orange-gradient-stop': 'var(--orange-gradient-stop)',

    'portable-sidebar-width': 'var(--portable-sidebar-width)',
    'portable-header-height': 'var(--portable-header-height)',
    'portable-banner-height': 'var(--portable-banner-height)',
    'portable-filter-height': 'var(--portable-filter-height)',
    'portable-brand': 'var(--portable-brand)',
    'portable-body': 'var(--portable-body)',
    'portable-grey': 'var(--portable-grey)',
};

function sss() {
    const plugins = [
        variables({ globals: globalVars }),
        nested(),
    ];

    return src(pathFolder + '**/*.sss')
        .pipe(clean({ force: true }))
        .pipe(postcss(plugins, { parser: sugarss }))
        .pipe(rename({ extname: '.css'}))
        .pipe(dest(pathFolder))
        // .pipe(postcss(pluginsAfter))
}

function es6() {
    return src([pathFolder + '**/*.js', pathFolder + '**/*.jsx'])
        .pipe(gulpStringReplace(".sss'", ".css'"))
        .pipe(dest(pathFolder))
}

exports.default = series(sss, es6);