describe("Music Store", function() {

  describe("Homepage", function() {
    var homepage = 'http://localhost:3333/'

    beforeEach(function() {
      browser.get(homepage)
    })

    it("should have title 'Music Store'", function() {
      expect(element(by.css('body > header h1')).getText()).toEqual("Music Store")
    })

    it("should list all albums for donation/purchase w/out details", function() {
      // All albums (thumbnails)
      expect(element.all(by.css('.album')).count()).toBeGreaterThan(0)
      expect(element.all(by.css('.album')).first().getText()).toBeTruthy()

      // No album details in this state
      expect(element(by.id('album-details')).getCssValue('display')).toBe('none')
    })

    it("should list albums by language", function() {
      pending()
    })

    it("should display an album details when an album is clicked", function() {
      element.all(by.css('.album')).first().click()

      expect(element(by.id('album-details')).getCssValue('visibility')).toBe('visible')
      expect(element.all(by.css('.track .audio-player')).count()).toBeGreaterThan(0)
    })

    describe("Album details", function () {
      it("should display the details of an album", function() {
        // TODO: Improve these selectors (toBePresent)
        expect(element.all(by.css('#album-details > #album-title').count())).toBe(1)
        expect(element.all(by.css('#album-details > #album-author').count())).toBe(1)
        expect(element.all(by.css('#album-details > #album-cover').count())).toBe(1)
        expect(element.all(by.css('#album-details > #album-description').count())).toBe(1)
        expect(element.all(by.css('#album-details > #album-reviews').count())).toBe(1)
        expect(element.all(by.css('#album-details > #album-tracks').count())).toBe(1)
        expect(element.all(by.css('#album-details > #album-checkout').count())).toBe(1)
      })

      describe("when clicking the checkout button", function() {
        beforeEach(function() {
          element.find('#album-details > #album-checkout').click()
        })

        it("should go to the checkout page", function() {
          expect(browser.getLocationAbsUrl()).toMatch('/checkout$/')
          pending()
        })
      })
    })

  })

})
