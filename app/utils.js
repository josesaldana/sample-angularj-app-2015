angular.module('MusicStore.Utils', [])
  .directive('audioControl', function() {
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="audio-player">' + 
                  '<button id="playOrStop" ng-click="playOrStop()">P<button>' +
                '</div>',
      controller: ['$scope', function($scope) {
        $scope.playOrStop = function() {
          $scope.playing = true
        }
      }]
    }
  }) 
    
