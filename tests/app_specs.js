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

            controller.showDetails('al1')

            expect($scope.showingDetails).toBe(true)
            expect($scope.selectedAlbum).toBe('al1')
        })

    })

    describe("AlbumDetailsController", function() {

        it("should get the details of an album", function() {
            var al1 = {
              id: 'al1', title: 'Album #1', 
              tracks: [
                {id: 'tr1', title: 'Song 1', number: 1}
            ]}

            $httpBackend.when('GET', '/albums/al1.json').respond(al1);

            var $scope = $rootScope.$new()

            // Inherited models
            $scope.showingDetails = true
            $scope.selectedAlbum = 'al1'

            var controller = $controller('AlbumDetailsController', {$scope: $scope, Album: Album})

            $httpBackend.flush()

            expect($scope.album.id).toBe('al1')
            expect($scope.album.tracks.length).toBe(1)

        })
    })
})
