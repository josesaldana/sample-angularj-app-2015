describe("MusicStore.ShoppingCart", function() {

  /*
   * The MusicStore.ShoppingCart component it's a shopping cart
   */

  beforeEach(module('MusicStore.ShoppingCart'))
  beforeEach(inject(function(_shoppingCart_) {
    shoppingCart = _shoppingCart_
  }))

  describe("when adding an item", function() {
    beforeEach(function() {
      var item = { id: 'al1' }
      shoppingCart.addItem(item)
    })

    afterEach(function() {
      shoppingCart.clear()
    })

    it("should store it temporarly for purchase to be completed", function() {
      var items = shoppingCart.getItems()
      expect(items).not.toBeUndefined()
      expect(items.length).toBe(1)

      var itemAdded = items[0]
      expect(itemAdded.id).toBe('al1')
      expect(itemAdded.donation).toBe(null)
      // expect(itemAdded.quantity).toBe(1)
    })

    describe("The item added", function() {
      it("should have an initial donation amount and how many units has been added of the same item", function() {
        var itemAdded = shoppingCart.getItems()[0]
        expect(itemAdded.id).toBe('al1')
        expect(itemAdded.donation).toBe(null)
        // expect(itemAdded.quantity).toBe(1)
      })
    })

    xdescribe("when adding an item twice", function() {
      beforeEach(function() {
        var item1Again = { id: 'al1' }
        var item2 = { id: 'al2' }
        shoppingCart.addItem(item1Again)
        shoppingCart.addItem(item2)
      })

      it("should not add it again but rather update the quantity of the item added", function() {
        var items = shoppingCart.getItems()
        expect(items).not.toBeUndefined()
        expect(items.length).toBe(2)

        var item1AddedTwice = items[0]
        expect(item1AddedTwice.id).toBe('al1')
        expect(item1AddedTwice.donation).toBe(null)
        expect(item1AddedTwice.quantity).toBe(2)

        var item2 = items[1]
        expect(item2.id).toBe('al2')
        expect(item2.donation).toBe(null)
        expect(item2.quantity).toBe(1)
      })
    })
  })

})

