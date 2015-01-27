describe("Music Store", function() {

  describe("Store page (Homepage)", function() {
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

    xit("should list albums by language", function() {
      pending();
    })

    describe("when clicking on an album", function() {
      beforeEach(function() {
        element.all(by.css('.album')).first().click()
      })

      it("should display the details of the album", function() {
        expect(element(by.id('album-details')).getCssValue('visibility')).toBe('visible')

        // TODO: Improve these selectors (isPresent)
        expect(element(by.id('album-title')).isPresent()).toBe(true)
        expect(element.all(by.css('#album-details #album-author')).count()).toBe(1)
        expect(element.all(by.css('#album-details #album-cover')).count()).toBe(1)
        expect(element.all(by.css('#album-details #album-description')).count()).toBe(1)
        expect(element.all(by.css('#album-details #album-reviews')).count()).toBe(1)
        expect(element.all(by.css('#album-details #album-tracks')).count()).toBe(1)
        expect(element.all(by.css('#album-details #add-to-cart')).count()).toBe(1)

        expect(element.all(by.css('.track .audio-player')).count()).toBeGreaterThan(0)
      })

      describe("when the details is shown", function () {

        describe("when adding the album to the shopping cart", function() {
          beforeEach(function() {
            element(by.id('add-to-cart')).click()
          })

          it("should update the status of the shopping cart showing that the item has been added", function() {
            expect(element(by.css('#shopping-cart-indicator')).getCssValue('display')).toEqual('block')
            expect(element(by.css('#shopping-cart-indicator #items-in-cart')).getText()).toEqual('1')
          })
        })
      })
    })

    describe("when having items in the shopping cart", function() {
      beforeEach(function() {
        element.all(by.css('.album a')).first().click()
        element(by.id('add-to-cart')).click()
      })

      it("should show a short status of the shopping cart (items added)", function() {
        expect(element(by.css('#shopping-cart-indicator')).getCssValue('display')).toEqual('block')
        expect(element(by.css('#shopping-cart-indicator #items-in-cart')).getText()).toEqual('1')
      })

      describe("when clicking the 'Show Shopping Cart' button", function() {
        beforeEach(function() {
          element.all(by.css('#shopping-cart-indicator a')).first().click()
        })

        it("should go to the Shopping Cart page", function() {
          expect(browser.getLocationAbsUrl()).toEqual('/shopping-cart')
          expect(element.all(by.css('#shopping-cart header h2')).first().getText()).toEqual('Shopping Cart')
        })

        describe("when in in the Shopping Cart page", function() {

          it("should list all items to be purchased", function() {
            expect(element(by.id('products'))).not.toBeUndefined()

            expect(element.all(by.css('#products .product')).count()).toBe(1)
            expect(element.all(by.css('#products .product .description')).count()).toBe(1)
            expect(element.all(by.css('#products .product .donation')).count()).toBe(1)

            expect(element.all(by.css('#products #total-amount')).count()).toBe(1)
          })

          it("should have an option to proceed with checkout", function() {
            expect(element(by.id('checkout'))).not.toBeUndefined()
            expect(element(by.id('checkout')).getAttribute('href')).toEqual('/checkout')
          })

          describe("when updating the amount of an item", function() {
            it("should update the total amount", function() {
              element.all(by.css('#products input.donation')).first().sendKeys('12')

              expect(element.all(by.css('#total-amount strong')).first().getText()).toEqual('$12.00')
            })
          })
        })

        describe("when proceeding to pay", function() {
          it("should display the checkout form", function() {
            element(by.id('checkout')).click()

            expect(element(by.id('payment')).getCssValue('display')).toBe('block')
          })

          describe("when paying (after entering correct values in the payment form)", function() {
            beforeEach(function() {
              element.all(by.css('form[name=payment-form] input.firstName')).first().sendKeys('Jose')
              element.all(by.css('form[name=payment-form] input.lastName')).first().sendKeys('Saldana')
              element.all(by.css('form[name=payment-form] input.address')).first().sendKeys('Bda. Nueva Esperanza')
              element.all(by.css('form[name=payment-form] input.zip')).first().sendKeys('1234')
              element.all(by.css('form[name=payment-form] input.city')).first().sendKeys('Panama')

              element.all(by.css('form[name=payment-form]')).first().submit()
            })

            // Order paid 
            it("should process the payment and display a success message with instructions to download the album", function () {
              expect(browser.getLocationAbsUrl()).toEqual('/payment-success')
              expect(element(by.css('#payment-success header h2')).getText()).toEqual('Payment success')
              expect(element(by.css('#download-instructions header h4')).getText()).toEqual('Download instructions')
            })
          })
        })
      })
    })
  })

})
