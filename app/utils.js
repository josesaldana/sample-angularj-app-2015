// utils.js
// --------
// TODO: Finish 'paused' state, Move 'inline/block' mode to be configurable

angular.module('MusicStore.Utils', [])

  .directive('audioPlayer', function() {
    return {
      restrict: 'E',
      replace: true,
      template: '<div class="audio-player inline" ng-class="{\'playing\': playing, \'paused\': !playing}">' +
                  '<audio ng-src="{{track.previewUrl}}"></audio>' +
                  '<button id="playOrStop" class="player-control glyphicon glyphicon-play" ng-click="playOrStop()"></button>' +
                '</div>',
      scope: {
        track: '=track'
      },
      link: function(scope, element, attr) {
        var audioEl = element.find('audio').get(0)

        angular.element(audioEl)
          .on('ended', function() {
            element.toggleClass('stopped')
          }) // To be completed

        element.find('button').on('click', function() {
          var playing = scope.playing || false

          if(! playing) {
            audioEl.play()
            playing = true

            element.toggleClass('playing')
            element.find('button').removeClass('glyphicon-play').addClass('glyphicon-stop')
          } else {
            audioEl.pause()
            playing = false

            element.toggleClass('paused')
            element.find('button').removeClass('glyphicon-stop').addClass('glyphicon-play')

            audioEl.fastSeek(audioEl.duration)
          }

          scope.playing = playing
        })
      }
    }
  })

