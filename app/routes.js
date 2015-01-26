angular.module('MusicStore.App.Routes', ['ui.router'])

  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/")

    $stateProvider
      .state('index', {
        url: "/",
        templateUrl: "app/templates/all.html",
        controller: 'StoreController'
      })
      .state('index.album', {
        url: "/album",
        templateUrl: "app/templates/album.html"
      })
      .state('shopping-cart', {
        url: '/shopping-cart',
        templateUrl: "app/templates/shopping-cart.html",
        controller: 'ShoppingCartController'
      })
  })
