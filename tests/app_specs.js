describe("MusicStore", function() {
    var $controller, $rootScope, $httpBackend, 
        // Factories
        Album; 

    beforeEach(module('ngResource'))
    beforeEach(module('ui.router'))
    beforeEach(module('MusicStore'))

    beforeEach(inject(function(_$controller_, _$rootScope_, _$httpBackend_, _Album_) {
        $controller = _$controller_
        $rootScope = _$rootScope_
        $httpBackend = _$httpBackend_
        Album = _Album_
    }))

    afterEach(function() {
      $httpBackend.resetExpectations()
    })

    describe("AlbumsController", function() {

        it("should list all albums", function() {
            $httpBackend.expectGET('/albums/all.json').respond([{id: 'al1'}])

            var $scope = $rootScope.$new()
            var $state = {}
            var controller = $controller('AlbumsController', {$scope: $scope, Album: Album})

            $httpBackend.flush()

            //expect(angular.equals($scope.albums, [{id: 'al1'}])).toBe(true)
            expect($scope.albums.length).toBe(1)
            expect($scope.showingDetails).toBe(false)
            expect($scope.selectedAlbum).toBeUndefined()
        })

       it("should open details view when an album is clicked", function() {
            var $scope = $rootScope.$new()
            var controller = $controller('AlbumsController', {$scope: $scope, Album: Album})

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

})
