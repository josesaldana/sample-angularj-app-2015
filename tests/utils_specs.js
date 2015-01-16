describe("MusicStore.Utils", function() {
  var $rootScope

  beforeEach(module('MusicStore.Utils'))
  beforeEach(inject(function(_$rootScope_) {
    $rootScope = _$rootScope_
  }))

  describe("audioControl directive", function() {
    var $compile

    beforeEach(inject(function(_$compile_) {
      $compile = _$compile_
    }))

    it("should generate markup for a custom HTML5 audio control", function() {
      var element = $compile("<audio-control data-src-id='al1-tr1'></audio-control>")($rootScope)

      $rootScope.$digest()

      expect(element.html()).toContain("<button id=\"playOrStop\"")
      expect($rootScope.playOrStop).not.toBeUndefined()

      //angular.element(element).eq(0)
      //expect($rootScope.playing).toBe(true)
    })
  })

})


