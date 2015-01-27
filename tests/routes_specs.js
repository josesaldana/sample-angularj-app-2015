describe("MusicStore.App.Routes", function() {
  var $location, $templateCache, $rootScope, $state

  beforeEach(module('MusicStore.App.Routes'))
  beforeEach(inject(function(_$location_, _$templateCache_, _$rootScope_, _$state_) {
    $location = _$location_
    $templateCache = _$templateCache_
    $rootScope = _$rootScope_
    $state = _$state_
  }))

  describe("/", function() {
    beforeEach(mockTemplate.bind(null, 'app/templates/all.html'))

    it("should go to the home page (albums list)", function() {
      goTo('/')
      expect($state.current.name).toEqual('index')
    })
  })

  describe("", function() {
    beforeEach(mockTemplate.bind(null, 'app/templates/all.html'))

    it("should go to the home page (albums list", function() {
      goTo("")
      expect($state.current.name).toEqual('index')
    })
  })
 
  describe("/shopping-cart", function() {
    beforeEach(mockTemplate.bind(null, 'app/templates/shopping-cart.html'))

    it("should go to the shopping cart page", function() {
      goTo("/shopping-cart")

      expect($state.current.name).toEqual('shopping-cart')
      expect($state.current.templateUrl).toEqual('app/templates/shopping-cart.html')
      expect($state.current.controller).toEqual('ShoppingCartController')
    }) 
  })

  describe("/shopping-cart/checkout", function() {
    beforeEach(mockTemplate.bind(null, 'app/templates/checkout.html'))

    it("should redirect to the checkout page (route)", function() {
      goTo("/checkout")
      expect($state.current.name).toEqual('shopping-cart.checkout')
    })
  })


  // ------- //
  // Helpers //
  // ------- //
  function mockTemplate (templateRoute, tmpl) {
    $templateCache.put(templateRoute, tmpl || templateRoute)
  }

  function goTo(url) {
    $location.url(url)
    $rootScope.$digest()
  }

  function goFrom(url) {
    return {
      toState: function(state, params) {
        $location.replace().url(url)
        $state.go(state, params)
        $rootScope.$digest()
      }
    }
  }

})
