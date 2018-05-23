(function () {
    'use strict';

    module.exports = function (GLOBAL, gulp) {
        return function () {
            return gulp.src([
                '**',
                '.*',
                '!.idea/',
                '!.gitignore',
                '!bower_components/**',
                '!bower_components',
                '!node_modules/**',
                '!node_modules',
                '!' + GLOBAL.dirs.themeforest + '**',
                '!' + GLOBAL.dirs.themeforest,
                '!mailer/config.php',
                '!src/documentation/*',
                '!' + GLOBAL.dirs.assets + 'images/lady/*',
                '!' + GLOBAL.dirs.assets + 'images/team/*',
                '!' + GLOBAL.dirs.assets + 'images/cases/*',
                GLOBAL.dirs.assets + 'images/*.png',
                GLOBAL.dirs.assets + 'images/demos/*'
            ])
                .pipe(gulp.dest(GLOBAL.dirs.themeforest + 'build'));
        };
    };
})();
