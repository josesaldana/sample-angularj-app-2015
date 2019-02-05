var Page = function(url) {
  browser.get(url)

  this.hasForm = function(formName) {
    function _withField(fieldName) {
      var form = element(by.css('form[name=' + formName + ']')) || { element: function() { return undefined; } }
      return form.element(by.css('*[name=' + fieldName + ']')) != undefined
    }

    return {
      withField: _withField,

      withFields: function(fieldNames) {
        if(! fieldNames || ! typeof(fieldNames) === 'Array' || ! fieldNames.length < 1)
          return false

        for(var i=0; fieldNames.length; i++) {
          if(! _withField(fieldNames[i]))
            return false
        }

        return true
      },

      inIt: element(by.css('form[name=' + formName + ']')) != undefined
    }
  }

  this.fillField = function(name, value) {
    element(by.css('input[name=' + name + ']')).sendKeys(value)
  }

  this.selectValue = function(fieldName, value) {
    element(by.css('select[name=' + fieldName + ']')).selectValue(value)
  }

  this.submitForm = function(formName) {
    element(by.css('form[name=' + formName + ']')).submit()
  }

  this.hasErrors = function() {
    return element(by.tagName('input')).getClassName().contains('has-error') || 
            element(by.tagName('select')).getClassName().contains('has-error')
  }

}

var CheckoutPage = { }
CheckoutPage.prototype = Page
CheckoutPage.prototype.fillFirstName = function(firstName) {
  fillField('firstName', firstName)
}

