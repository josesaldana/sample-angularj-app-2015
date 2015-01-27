angular.module('MusicStore.ShoppingCart', ['angular-lodash'])

  .service('shoppingCart', function() {
    var items = []

    return {
      addItem: function(item) {
        // if(_.some(items, {id: item.id}))
        //   _.find(items, {id: item.id}).quantity += 1
        // else {
        //   item.donation = null
        //   item.quantity = 1
        //   items.push(item)
        // }
        item.donation = item.donation || null
        items.push(item)
      },
      getItems: function() {
        return items
      },
      getTotal: function() {
        return _.reduce(items, function(total, item) { return total + (parseFloat(item.donation || 0)); }, 0.00)
      },
      clear: function() {
        while(items.length) items.pop()
      }
    }
  })
