// MusicStore App
//
angular.module('MusicStore', [
               'ngResource',
               'MusicStore.App.Routes',
               'MusicStore.Utils',
               'MusicStore.ShoppingCart'
            ])

  .factory('Album', function($resource) {
    return $resource('/albums/:id.json', {}, {
      query: {method: 'GET', params: {id:'all'}, isArray: true}
    });
  })

  .controller('StoreController', function($scope, Album, shoppingCart) {
    // All albums
    $scope.albums = []
    $scope.showingDetails = false
    $scope.shoppingCart = shoppingCart

    Album.query(function(data) {
      $scope.albums = data
    });

    // Album details
    $scope.album = { tracks: [] }

    this.showDetails = function(albumId) {
      $scope.showingDetails = $scope.selectedAlbum !== albumId || !$scope.showingDetails
      $scope.selectedAlbum = albumId

      Album.get({id: $scope.selectedAlbum}, function(data) {
        $scope.album = data
      })
    }

    this.addToCart = function(album) {
      shoppingCart.addItem(album)
    }

    $scope.showDetails = this.showDetails
    $scope.addToCart = this.addToCart
  })

  .controller('ShoppingCartController', function($scope, shoppingCart, $state) {
    $scope.items = shoppingCart.getItems()
    $scope.totalAmount = shoppingCart.getTotal()
    $scope.shoppingCartIsValid = false

    $scope.$watch('items', function(newItems, oldItems) {
      $scope.totalAmount = shoppingCart.getTotal()
    }, true)

    this.addToCart = function(album) {
      shoppingCart.addItem(album)
    }

    this.checkout = function() {
      $state.transitionTo('shopping-cart.checkout')
    }

    $scope.checkout = this.checkout
  })

  .controller('CheckoutController', function($scope, shoppingCart, $state) {
    this.pay = function() {
      shoppingCart.pay()

      if(shoppingCart.isPaid())
        $state.transitionTo('payment-success')
    }

    $scope.pay = this.pay
  })

