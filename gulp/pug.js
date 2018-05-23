(function () {
    'use strict';

    module.exports = function (GLOBAL, gulp) {

        var pug = require('gulp-pug');
        var beautify = require('gulp-jsbeautifier');

        return function () {
            gulp.src([
                GLOBAL.dirs.jade + '*.pug',
                GLOBAL.dirs.pug + '**/*.pug',
                '!' + GLOBAL.dirs.pug + '**/_*.pug'
            ])
                .pipe(pug())
                .pipe(beautify({
                    html: {
                        indent_char: ' ',
                        indent_size: 4,
                        preserveNewlines: false,
                        indent_inner_html: true,
                        unformatted: ['span', 'sup'],
                        extra_liners: ['section', 'footer'],
                        wrap_line_length: 0
                    }
                }))
                .pipe(gulp.dest('./'));
        };
    };
})();
