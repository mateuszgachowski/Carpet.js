module.exports = function (config) {

  var customLaunchers = {

    // BrowserStack
    'BS_Chrome': {
      base: 'BrowserStack',
      browser: 'chrome',
      os: 'OS X',
      os_version: 'Yosemite'
    },
    'BS_Safari': {
      base: 'BrowserStack',
      browser: 'safari',
      os: 'OS X',
      os_version: 'Yosemite'
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

    frameworks: ['jasmine'],

    files: [
      'src/carpet.js',
      'tests/spec/carpet.test.js'
    ],

    reporters: ['dots'],
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    singleRun: true,

    customLaunchers: customLaunchers,
    browsers: Object.keys(customLaunchers)
  });
};