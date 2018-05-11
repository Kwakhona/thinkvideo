let webpackConfig = require('../build/webpack.test.config');

module.exports = function (config) {
    'use strict';

    config.set({
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // base path, that will be used to resolve files and exclude
        basePath: '',

        // testing framework to use (jasmine/mocha/qunit/...)
        // as well as any additional frameworks (requirejs/chai/sinon/...)
        frameworks: [
            "jasmine"
        ],

        preprocessors: {
            ['../app/test.js']: ['webpack']
        },

        webpack: webpackConfig,

        // list of files / patterns to load in the browser
        files: [
            '../app/test.js'
        ],

        // web server port
        port: 9876,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: [
            "PhantomJS"
            // "Chrome"
        ],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,

        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_INFO,

        reporters: ['progress', 'coverage'],

        coverageReporter: {
            reporters: [{
                    type: 'lcov',
                    dir: '../reports/coverage',
                    'subdir': '.'
                },
                {
                    type: 'json',
                    dir: '../reports/coverage',
                    'subdir': '.'
                },
                {
                    type: 'text-summary'
                }
            ]
        },

        concurrency: Infinity

    });
};

