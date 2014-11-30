module.exports = function (config) {

  var customLaunchers = {
    // Sauce labs
    // 'SL_Chrome': {
    //   base: 'SauceLabs',
    //   browserName: 'chrome',
    //   version: '34'
    // },
    // 'SL_Firefox': {
    //   base: 'SauceLabs',
    //   browserName: 'firefox',
    //   version: '26'
    // },
    // 'SL_Safari': {
    //   base: 'SauceLabs',
    //   browserName: 'safari',
    //   platform: 'OS X 10.9',
    //   version: '7'
    // },
    // 'SL_IE_9': {
    //   base: 'SauceLabs',
    //   browserName: 'internet explorer',
    //   platform: 'Windows 2008',
    //   version: '9'
    // },
    // 'SL_IE_10': {
    //   base: 'SauceLabs',
    //   browserName: 'internet explorer',
    //   platform: 'Windows 2012',
    //   version: '10'
    // },
    // 'SL_IE_11': {
    //   base: 'SauceLabs',
    //   browserName: 'internet explorer',
    //   platform: 'Windows 8.1',
    //   version: '11'
    // },

    // BrowserStack
    'BS_Chrome': {
      base: 'BrowserStack',
      browser: 'chrome',
      os: 'OS X',
      os_version: 'Mountain Lion'
    },
    'BS_Safari': {
      base: 'BrowserStack',
      browser: 'safari',
      os: 'OS X',
      os_version: 'Mountain Lion'
    },
    'BS_Firefox': {
      base: 'BrowserStack',
      browser: 'firefox',
      os: 'Windows',
      os_version: '8'
    },
    'BS_IE_9': {
      base: 'BrowserStack',
      browser: 'ie',
      browser_version: '9.0',
      os: 'Windows',
      os_version: '7'
    },
    'BS_IE_10': {
      base: 'BrowserStack',
      browser: 'ie',
      browser_version: '10.0',
      os: 'Windows',
      os_version: '8'
    },
    'BS_IE_11': {
      base: 'BrowserStack',
      browser: 'ie',
      browser_version: '11.0',
      os: 'Windows',
      os_version: '8.1'
    }
  };

  config.set({

    browserStack: {
      username: process.env.BROWSER_STACK_USERNAME,
      accessKey: process.env.BROWSER_STACK_ACCESS_KEY
    },

    sauceLabs: {
      testName: 'Carpet.js Unit Tests'
    },

    basePath: '',

    frameworks: ['jasmine'],

    files: [
      'src/carpet.js',
      'tests/spec/carpet.test.js'
    ],

    exclude: [

    ],

    preprocessors: {},

    reporters: ['dots', 'saucelabs'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: true,

    singleRun: true,

    customLaunchers: customLaunchers,

    browsers: Object.keys(customLaunchers)
  });
};