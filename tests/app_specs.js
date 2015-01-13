describe("MusicStore", function() {
    beforeEach(module('MusicStore'))

    var $controller

    beforeEach(inject(function(_$controller_) {
        $controller = _$controller_
    }))

    describe("AlbumsController", function() {

        it("should list all albums", function() {
            var $scope = {};
            var controller = $controller('AlbumsController', {$scope: $scope})

            expect($scope.albums).toBeTruthy();
        })
    })

})