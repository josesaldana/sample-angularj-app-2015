angular.module('MusicStore.Utils', [])

  .directive('audioControl', function() {
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="audio-player">' +
                  '<audio src="{{track.previewUrl}}"></audio>' +
                  '<button id="playOrStop" ng-click="playOrStop()">P<button>' +
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

