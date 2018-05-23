(function () {
    'use strict';

    module.exports = function (GLOBAL, gulp) {
        return function () {
            gulp.watch([
                GLOBAL.dirs.sass + '*.scss',
                GLOBAL.dirs.sass + '**/*.scss'
            ], ['sass']);
            gulp.watch([
                GLOBAL.dirs.pug + '*.pug',
                GLOBAL.dirs.pug + '**/*.pug'
            ], ['pug']);
        };
    };
})();
