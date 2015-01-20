// MusicStore App
//
angular.module('MusicStore', ['ngResource', 'ui.router', 'MusicStore.Utils'])

  .config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/")

    $stateProvider
      .state('index', {
        url: "/",
        templateUrl: "app/templates/all.html",
        controller: 'AlbumsController'
      })
      .state('index.album', {
        url: "/album",
        templateUrl: "app/templates/album.html"
      })
  })

  .factory('Album', function($resource) {
    return $resource('/albums/:id.json', {}, {
      query: {method: 'GET', params: {id:'all'}, isArray: true}
    });
  })

  .controller('AlbumsController', function($scope, Album) {
    // All albums
    $scope.albums = []
    $scope.showingDetails = false

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

    $scope.showDetails = this.showDetails
  })

