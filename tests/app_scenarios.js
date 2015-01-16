describe("Music Store", function() {

  describe("Homepage", function() {
    var homepage = 'http://localhost:3333/'

    it("should have title 'Music Store'", function() {
      browser.get(homepage)

      expect(element(by.css('body > header h1')).getText()).toEqual("Music Store")
    })

    it("should list all albums for donation/purchase w/out details", function() {
      browser.get(homepage)

      // All albums (thumbnails)
      expect(element.all(by.css('.album')).count()).toBeGreaterThan(0)
      expect(element.all(by.css('.album')).first().getText()).toBeTruthy()

      // No album details in this state
      expect(element(by.id('album-details')).getCssValue('display')).toBe('none')
    })

    it("should display an album details when an album is clicked", function() {
      browser.get(homepage)

      element.all(by.css('.album')).first().click()

      expect(element(by.id('album-details')).getCssValue('visibility')).toBe('visible')
    })

  })

})
