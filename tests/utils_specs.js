describe("MusicStore.Utils", function() {

  beforeEach(module('MusicStore.Utils'))

  describe("directive: audio-control", function() {
    var element, scope

    beforeEach(inject(function($compile, $rootScope) {
      scope = $rootScope.$new()

      var audioControl = "<audio-control data-track='track'></audio-control>"

      scope.track = { previewUrl: 'albums/al1/al1tr1.mp3' }

      element = $compile(audioControl)(scope)
      scope.$digest()
    }))

    describe("when rendered", function() {
      it("should generate markup for a custom HTML5 audio control", function() {
        expect(element.hasClass('audio-player')).toBe(true)
        expect(element.find('button').length).toBeGreaterThan(0)
        expect(element.find('audio').length).toBe(1)
        expect(element.find('audio').attr('src')).toBe('albums/al1/al1tr1.mp3')
      })
    })

    describe("when clicking the play button", function() {
      it("should play the song", function() {
        element.find('button').click()

        var isolated = angular.element(element).isolateScope()

        expect(isolated.playing).toBe(true)

        var audioEl = element.find('audio').get(0)
        expect(audioEl.paused).toBe(false)
        expect(audioEl.ended).toBe(false)

        expect(element.hasClass('playing')).toBe(true)
      })

      xit("should pause the song if is playing", function() {

        var audioEl = element.find('audio').get(0)
        if(! audioEl.paused && ! audioEl.ended) 
          audioEl.pause()

        var isolated = angular.element(element).isolateScope()

        expect(isolated.playing).toBe(false)
        expect(element.find('audio').get(0).paused).toBe(true)
        expect(element.find('audio').get(0).ended).toBe(false)
      })
    })

    describe("when the song has finished", function() {
      xit("it should indicate the song can be played", function() {
        var audioEl = element.find('audio').get(0)
        audioEl.fastSeek(audioEl.duration.toFixed(2))

        expect(element.hasClass('paused')).toBe(true)
      })
    })

  })
})


