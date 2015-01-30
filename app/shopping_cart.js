angular.module('MusicStore.ShoppingCart', ['angular-lodash'])

  .service('shoppingCart', function() {
    var items = [],
        totalAmount = 0.0
        paid = false

    var addItem = function(item) {
      // if(_.some(items, {id: item.id}))
      //   _.find(items, {id: item.id}).quantity += 1
      // else {
      //   item.donation = null
      //   item.quantity = 1
      //   items.push(item)
      // }
      item.donation = item.donation || null
      items.push(item)
    }

    var getItems = function() {
      return items
    }

    var getTotal = function() {
      return totalAmount = _.reduce(items, function(total, item) { return total + (parseFloat(item.donation || 0)); }, 0.00)
    }

    var clear = function() {
      while(items.length) items.pop()
    }

    var pay = function(shippingInfo, paymentInfo) {
      if( !paid  && items.length < 1)
        throw "Cannot proceed with payment"

      var order = {
        shippingInfo: shippingInfo,
        paymentInfo: paymentInfo,
        totalAmount: getTotal()
      }
      // TODO: Process payment 

      paid = true
    }

    var isPaid = function() {
      return paid
    }

    return {
      addItem: addItem,
      getItems: getItems,
      getTotal: getTotal,
      clear: clear,
      pay: pay,
      isPaid: isPaid
    }
  })

