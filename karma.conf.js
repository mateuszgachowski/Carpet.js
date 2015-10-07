module.exports = function (config) {

  var customLaunchers = {

    // BrowserStack
    // 'BS_Chrome': {
    //   base: 'BrowserStack',
    //   browser: 'chrome',
    //   os: 'OS X',
    //   os_version: 'Yosemite'
    // },
    // 'BS_Safari': {
    //   base: 'BrowserStack',
    //   browser: 'safari',
    //   os: 'OS X',
    //   os_version: 'Yosemite'
    // },
    // 'BS_Firefox': {
    //   base: 'BrowserStack',
    //   browser: 'firefox',
    //   os: 'Windows',
    //   os_version: '8'
    // },
    // 'BS_IE_9': {
    //   base: 'BrowserStack',
    //   browser: 'ie',
    //   browser_version: '9.0',
    //   os: 'Windows',
    //   os_version: '7'
    // },
    // 'BS_IE_10': {
    //   base: 'BrowserStack',
    //   browser: 'ie',
    //   browser_version: '10.0',
    //   os: 'Windows',
    //   os_version: '8'
    // },
    // 'BS_IE_11': {
    //   base: 'BrowserStack',
    //   browser: 'ie',
    //   browser_version: '11.0',
    //   os: 'Windows',
    //   os_version: '8.1'
    // }
    
    sl_chrome: {
      base: 'SauceLabs',
      browserName: 'chrome',
      platform: 'Windows 7',
      version: '35'
    },
    sl_firefox: {
      base: 'SauceLabs',
      browserName: 'firefox',
      version: '30'
    },
    sl_ios_safari: {
      base: 'SauceLabs',
      browserName: 'iphone',
      platform: 'OS X 10.9',
      version: '7.1'
    },
    sl_ie_11: {
      base: 'SauceLabs',
      browserName: 'internet explorer',
      platform: 'Windows 8.1',
      version: '11'
    }
  };

  config.set({

    // browserStack: {
    //   username: process.env.BROWSER_STACK_USERNAME,
    //   accessKey: process.env.BROWSER_STACK_ACCESS_KEY
    // },

    sauceLabs: {
        testName: 'Carpet.js jasmine tests',
        username: process.env.SAUCE_USERNAME,
        accessKey: process.env.SAUCE_ACCESS_KEY
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
};