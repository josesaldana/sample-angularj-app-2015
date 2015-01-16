// MusicStore App
//
angular.module('MusicStore', ['ngResource', 'ui.router'])

  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('musicStore', {
        url: '/',
        templateUrl: 'app/templates/albums.html',
        controller: 'AlbumsController'
      })
      .state('musicStore.album', {
        url: '/album',
        templateUrl: 'app/templates/album.html',
        controller: 'AlbumDetailsController'
      })

    $urlRouterProvider.otherwise('/music-store')
  })

  .factory('Album', function($resource) {
    return $resource('/albums/:id.json', {}, {
      query: {method: 'GET', params: {id:'all'}, isArray: true}
    });
  })

  .controller('AlbumsController', function($scope, Album) {
    $scope.albums = []
    $scope.showingDetails = false

    Album.query(function(data) {
      $scope.albums = data
    });

    this.showDetails = function(albumId) {
      $scope.showingDetails = true
      $scope.selectedAlbum = albumId
    }

    $scope.showDetails = this.showDetails
  })

  .controller('AlbumDetailsController', function($scope, Album) {
    $scope.album = { tracks: [] }

    Album.get({id: $scope.selectedAlbum}, function(data) {
      $scope.album = data
    })
  })

