describe("MusicStore", function() {
    var $controller, $rootScope, $httpBackend, 
        // Factories
        Album, shoppingCart

    beforeEach(module('ngResource'))
    beforeEach(module('ui.router'))
    beforeEach(module('MusicStore'))
    beforeEach(module('MusicStore.ShoppingCart'))

    beforeEach(inject(function(_$controller_, _$rootScope_, _$httpBackend_, _Album_, _shoppingCart_) {
        $controller = _$controller_
        $rootScope = _$rootScope_
        $httpBackend = _$httpBackend_
        Album = _Album_
        shoppingCart = _shoppingCart_
    }))

    afterEach(function() {
      $httpBackend.resetExpectations()
    })

    describe("StoreController", function() {

        it("should list all albums", function() {
            $httpBackend.expectGET('/albums/all.json').respond([{id: 'al1'}])

            var $scope = $rootScope.$new()
            var $state = {}
            var controller = $controller('StoreController', {$scope: $scope, Album: Album})

            $httpBackend.flush()

            //expect(angular.equals($scope.albums, [{id: 'al1'}])).toBe(true)
            expect($scope.albums.length).toBe(1)
            expect($scope.showingDetails).toBe(false)
            expect($scope.selectedAlbum).toBeUndefined()
        })

       it("should open details view when an album is clicked", function() {
            var $scope = $rootScope.$new()
            var controller = $controller('StoreController', {$scope: $scope, Album: Album})

            $httpBackend.expectGET('/albums/all.json').respond([{id: 'al1'}])
            $httpBackend.expectGET('/albums/al1.json').respond({id: 'al1', tracks: [{ id: 'al1tr1'}]})

            controller.showDetails('al1')
            $httpBackend.flush()

            expect($scope.showingDetails).toBe(true)
            expect($scope.selectedAlbum).toBe('al1')

            expect($scope.album.id).toBe('al1')
            expect($scope.album.tracks.length).toBe(1)
        })
    })

    describe("ShoppingCartController", function() {

      it("should add albums to the shopping cart", function() {
        spyOn(shoppingCart, 'addItem')

        var $scope = $rootScope.$new()
        var controller = $controller('ShoppingCartController', {$scope: $scope, shoppingCart: shoppingCart})

        var album = { id: 'al1', donation: 0.00 }
        controller.addToCart(album)

        expect(shoppingCart.addItem).toHaveBeenCalled()
        expect(shoppingCart.addItem.calls.length).toEqual(1)
      })

      it("should provide the items in the Shopping Cart", function() {
        shoppingCart.addItem({ id: 'al1', donation: 0.00 })

        var $scope = $rootScope.$new()
        var controller = $controller('ShoppingCartController', {$scope: $scope, shoppingCart: shoppingCart})

        expect($scope.items.length).toBe(1)
      })

      it("should update the shopping cart and the total amount when the donation amount changes", function() {
        shoppingCart.addItem({ id: 'al1', donation: 5.00 })
        shoppingCart.addItem({ id: 'al2'})

        var $scope = $rootScope.$new()
        var controller = $controller('ShoppingCartController', {$scope: $scope, shoppingCart: shoppingCart})

        $scope.items[1].donation = 10.00
        $scope.$digest()

        expect($scope.items[0].donation).toEqual(5.00)
        expect(shoppingCart.getItems()[0].donation).toEqual(5.00)
        expect($scope.totalAmount).toEqual(15.00)
      })
    })

})
