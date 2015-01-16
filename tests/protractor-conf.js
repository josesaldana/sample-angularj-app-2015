exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'app_scenarios.js'
  ],

  capabilities: {
    'browserName': 'firefox'
  },

  baseUrl: 'http://localhost:4444/wd/hub',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  }
};
