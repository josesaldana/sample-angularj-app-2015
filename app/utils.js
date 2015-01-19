angular.module('MusicStore.Utils', [])

  .directive('audioControl', function() {
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="audio-player" ng-class="{\'playing\': playing, \'paused\': !playing}">' +
                  '<audio src="{{track.previewUrl}}"></audio>' +
                  '<button id="playOrStop" class="player-control" ng-click="playOrStop()"></button>' +
                '</div>',
      scope: {
        track: '=track'
      },
      controller: ['$scope', function($scope) {
        var track = $scope.track

        $scope.playOrStop = function() {
          $scope.playing = ! $scope.playing

          //TODO: Implementing HTML5 Audio playing
        }
      }],
      link: function(scope, elements, attr) {
        // TO Be finished: 
      }
    }
  })

