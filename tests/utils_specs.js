describe("MusicStore.Utils", function() {

  beforeEach(module('MusicStore.Utils'))

  describe("directive: audio-player", function() {
    var element, scope

    beforeEach(inject(function($compile, $rootScope) {
      scope = $rootScope.$new()

      var audioControl = "<audio-player data-track='track'></audio-player>"

      scope.track = { previewUrl: 'albums/al1/al1tr1.mp3' }

      element = $compile(audioControl)(scope)
      scope.$digest()
    }))

    afterEach(function() {
      element.find('audio').get(0).pause()
    })

    describe("when rendered", function() {
      it("should generate markup for a custom HTML5 audio control", function() {
        expect(element.hasClass('audio-player')).toBe(true)
        expect(element.find('button').length).toBeGreaterThan(0)
        expect(element.find('button').hasClass('glyphicon-play')).toBe(true)
        expect(element.find('audio').length).toBe(1)
        expect(element.find('audio').attr('src')).toBe('albums/al1/al1tr1.mp3')
        expect(element.find('audio').prop('autoplay')).toEqual(false)
        expect(element.hasClass('paused')).toBe(true)
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
        expect(element.find('button').hasClass('glyphicon-stop')).toBe(true)
        expect(element.find('button').hasClass('glyphicon-play')).toBe(false)
      })
    })

    describe("when clicking the play button twice", function() {
      beforeEach(function() {
        element.find('audio').get(0).play()

        var isolate = angular.element(element).isolateScope()
        isolate.playing = true
        isolate.$apply()
      })

      xit("should pause the song if is playing", function() {
        element.find('button').click()

        var isolated = angular.element(element).isolateScope()

        expect(isolated.playing).toBe(false)
        expect(element.find('audio').get(0).paused).toBe(true)
        expect(element.find('audio').get(0).ended).toBe(true)
      })

      xit("should stop the song", function  () {
        //debugger 
        element.find('button').click()

        var isolated = angular.element(element).isolateScope()

        expect(isolated.playing).toBe(false)
        expect(element.find('audio').get(0).paused).toBe(true)
      })
    })

    xdescribe("when the song has finished", function() {
      beforeEach(function() {
        element.find('button').click()

        var audioEl = element.find('audio').get(0)
        audioEl.play()
        audioEl.fastSeek(audioEl.duration - 0.1)
      })

      it("it should indicate the song can be played", function() {
        expect(element.hasClass('stopped')).toBe(true)
        expect(element.find('button').hasClass('glyphicon-stop')).toBe(true)
      })
    })

  })

  describe('directive: validateAndSubmit', function() {
    var element, scope

    beforeEach(inject(function($compile, $rootScope, $injector, $controller) {
      scope = $rootScope.$new()

      scope.afterValidation = function() { }
      spyOn(scope, 'afterValidation')

      var form = "<form do-after-validation='afterValidation()' novalidate>" +
                    "<input ng-model='test' type='text' required />" + 
                    "<input type='type' value='Submit' />" + 
                  "</form>"

      element = $compile(form)(scope)
      scope.$digest()
    }))

    describe("when having the form invalid", function() {
      it('should not call the function to execute', function() {
        element.find('input[type=text]').val('')
        element.find('input[type=text]').trigger('input')
        element.submit()

        expect(scope.afterValidation).not.toHaveBeenCalled()
      })
    })

    describe("when having a valid form", function() {
      it('should call the function to execute', function() {
        element.find('input[type=text]').val('value')
        element.find('input[type=text]').trigger('input')
        element.submit()

        expect(scope.afterValidation).toHaveBeenCalled()
      })
    })

  })
})


