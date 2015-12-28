module.exports = function (config) {

  var customLaunchers = {


  	// Chrome
    sl_chrome_mac: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'OS X 10.11',
      version: '45.0'
    },
    sl_chrome_windows: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Windows 7',
      version: '45.0'
    },

    // Firefox
    sl_firefox_windows: {
      base: 'SauceLabs',
      browserName: 'firefox',
      platform: 'Windows 8',
      version: '41.0'
    },
    sl_firefox_mac: {
      base: 'SauceLabs',
      browserName: 'firefox',
      platform: 'OS X 10.11',
      version: '41.0'
    },

    // Safari
    sl_safari_mac: {
      base: 'SauceLabs',
      browserName: 'safari',
      platform: 'OS X 10.11',
      version: '9.0'
    },

    // IE
    sl_ie_9_windows: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 7',
      version: '9.0'
    },
    sl_ie_10_windows: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 7',
      version: '10.0'
    },
    sl_ie_11_windows: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 7',
      version: '11.0'
    }
  };

  config.set({

    sauceLabs: {
        testName: 'Carpet.js jasmine tests',
        startConnect: true
    },

    frameworks: ['jasmine'],

    files: [
      'src/**/*.js',
      'tests/spec/**/*.js'
    ],

    reporters: ['dots', 'saucelabs'],
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: true,

    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers)
  });

  if (process.env.TRAVIS)
    {
        label = "TRAVIS #" + process.env.TRAVIS_BUILD_NUMBER + " (" + process.env.TRAVIS_BUILD_ID + ")";

        config.sauceLabs.build = label;
        config.sauceLabs.startConnect = false;
        config.sauceLabs.tunnelIdentifier = process.env.TRAVIS_JOB_NUMBER;
    }
};
