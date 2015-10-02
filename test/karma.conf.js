// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2015-05-13 using
// generator-karma 1.0.0

module.exports = function(config) {
  'use strict';

  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    // as well as any additional frameworks (requirejs/chai/sinon/...)
    frameworks: [
      "jasmine"
    ],

    // list of files / patterns to load in the browser
    files: [
      // bower:js
      'app/lib/jquery/dist/jquery.js',
      'app/lib/angular/angular.js',
      'app/lib/bootstrap-sass-official/assets/javascripts/bootstrap.js',
      'app/lib/angular-animate/angular-animate.js',
      'app/lib/angular-cookies/angular-cookies.js',
      'app/lib/angular-resource/angular-resource.js',
      'app/lib/angular-route/angular-route.js',
      'app/lib/angular-sanitize/angular-sanitize.js',
      'app/lib/angular-touch/angular-touch.js',
      'app/lib/angular-ui-utils/ui-utils.js',
      'app/lib/angular-ui-map/ui-map.js',
      'app/lib/angular-translate/angular-translate.js',
      'app/lib/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
      'app/lib/satellizer/satellizer.js',
      'app/lib/angular-ui-router/release/angular-ui-router.js',
      'app/lib/angular-loader/angular-loader.js',
      'app/lib/angular-bootstrap/ui-bootstrap-tpls.js',
      'app/lib/angular-loading-bar/build/loading-bar.js',
      'app/lib/lodash/lodash.js',
      'app/lib/angular-mocks/angular-mocks.js',
      'app/lib/bootstrap/dist/js/bootstrap.js',
      'app/lib/ngvideo/dist/ng-video.js',
      'app/lib/angular-scroll/angular-scroll.js',
      'app/lib/angular-utf8-base64/angular-utf8-base64.js',
      'app/lib/moment/moment.js',
      'app/lib/angular-moment/angular-moment.js',
      'app/lib/ng-file-upload/ng-file-upload.js',
      'app/lib/angular-utils-pagination/dirPagination.js',
      'app/lib/angular-scenario/angular-scenario.js',
      // endbower
      "app/scripts/**/*.js",
      "test/mock/**/*.js",
      "test/spec/**/*.js"
    ],

    // list of files / patterns to exclude
    exclude: [
    ],

    // web server port
    port: 8080,

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
    ],

    // Which plugins to enable
    plugins: [
      "karma-phantomjs-launcher",
      "karma-jasmine"
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
