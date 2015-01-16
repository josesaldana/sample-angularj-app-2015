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

    describe("AlbumsController", function() {

        it("should list all albums", function() {
            $httpBackend.when('GET', '/albums/all.json').respond([{id: 'al1'}])

            var $scope = $rootScope.$new()
            var $state = {}
            var controller = $controller('AlbumsController', {$scope: $scope, Album: Album})

            $httpBackend.flush()

            //expect(angular.equals($scope.albums, [{id: 'al1'}])).toBe(true)
            expect($scope.albums.length).toBe(1)
            expect($scope.showingDetails).toBe(false)
            expect($scope.selectedAlbum).toBeUndefined()
        })

        it("should open details panel when an album is clicked", function() {
            var $scope = $rootScope.$new()
            var controller = $controller('AlbumsController', {$scope: $scope, Album: Album})

            var album = {id: 'al1', tracks: [{ id: 'al1-tr1'}]}
            $httpBackend.when('GET', '/albums/al1.json').respond(album)

            controller.showDetails('al1')

            expect($scope.showingDetails).toBe(true)
            expect($scope.selectedAlbum).toBe('al1')

            expect($scope.album.id).toBe('al1')
            expect($scope.album.tracks.lenght).toBe(1)
        })

    })

})
