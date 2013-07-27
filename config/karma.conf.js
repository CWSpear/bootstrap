// Karma configuration
// Generated on Sat Jul 27 2013 14:53:00 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({
    basePath: '../',

    frameworks: ['jasmine'],

    files: [
      'config/vendor/jquery.js',
      'config/vendor/angular.js',
      'config/vendor/angular-mocks.js',
      'config/vendor/test-helpers.js',
      'src/**/*.js',
      '.tmp/**/*.html.js'
    ],

    preprocessors: {},

    // test results reporter to use
    // possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
    reporters: ['progress'],

    port: 9018,
    runnerPort: 9100,
    autoWatch: true,
    colors: true,

    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: ['Chrome'],

    // If browser does not capture in given timeout [ms], kill it
    captureTimeout: 60000,
  });
};
