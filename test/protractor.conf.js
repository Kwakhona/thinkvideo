const webpack = require('webpack');
const path = require('path');
const WebpackDevServer = require('webpack-dev-server');

let server;

const config = {
    framework: 'jasmine',
    directConnect: true,
    jasmineNodeOpts: {
        showColors: true,
        defaultTimeoutInterval: 2500000
    },
    allScriptsTimeout: 2500000,
    suites: {
        Employee: './test/e2e/Employee/*.spec.js',
        Partner: './test/e2e/Partner/*.spec.js'
    },
    capabilities: {
        'browserName': 'chrome',
        chromeOptions: {
            args: ['--headless', '--disable-gpu', '--window-size=1300,800']
        }
    },
    resultJsonOutputFile: './test/e2e/e2eTestResults.json',
    onPrepare: function () {
        var disableNgAnimate = function () {
            angular
                .module('disableNgAnimate', [])
                .run(['$animate', function ($animate) {
                    $animate.enabled(false);
                }]);
        };

        var disableCssAnimate = function () {
            angular
                .module('disableCssAnimate', [])
                .run(function () {
                    var style = document.createElement('style');
                    style.type = 'text/css';
                    style.innerHTML = '* {' +
                        '-webkit-transition: none !important;' +
                        '-moz-transition: none !important' +
                        '-o-transition: none !important' +
                        '-ms-transition: none !important' +
                        'transition: none !important' +
                        '}';
                    document.getElementsByTagName('head')[0].appendChild(style);
                });
        };

        browser.addMockModule('disableNgAnimate', disableNgAnimate);
        browser.addMockModule('disableCssAnimate', disableCssAnimate);

        // //joiner between browser name and file name
        // screenshots.browserNameJoiner = ' - '; //this is the default
        // //folder of screenshots
        // screenshots.screenShotDirectory = 'test/e2e/screenshots';
        // //creates folder of screenshots
        // screenshots.createDirectory();

    },
    /**
     * Start a webpack dev server on a random port.
     *
     * The protractor `baseUrl` is set to this port on localhost.
     */
    beforeLaunch: () => {
        return new Promise(resolve => {
            setTimeout(() => {

                const compiler = webpack({
                    context: path.join(__dirname, '/..', '/dist/'),
                    entry: {
                        index: './index',
                        vendor: './vendor'
                    },
                });
                server = new WebpackDevServer(compiler, {
                    stats: 'errors-only',
                    contentBase: path.join(__dirname, '/..', '/dist/'),
                });
                server.listen(0, 'localhost', () => {
                    const address = server.listeningApp.address();
                    config.baseUrl = `http://localhost:${address.port}`;
                    resolve();
                });
            }, 5000);
        });
    },
    afterLaunch: () => {
        server.close();
    }
};


module.exports = {
    config
};

