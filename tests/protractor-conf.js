exports.config = {
  allScriptsTimeout: 11000,

  specs: [
    'app_scenarios.js'
  ],

  capabilities: {
    'browserName': 'chrome'
  },

  baseUrl: 'http://localhost:4444/wd/hub',

  framework: 'jasmine',

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  },

  onPrepare: function() {
    protractor.By.addLocator('siblingOf', function(findFrom, sibling, optParentEl, optRootEl) {
      var using = optRootEl,
          findFromEl = using.querySelectorAll(findFrom)
          siblingEl = findFromEl[0].querySelectorAll(sibling)

      console.log(using)
      return Array.prototype.filter.call(siblingEl, function(s) {
        return s.className = sibling
      })
    })
  }
};
