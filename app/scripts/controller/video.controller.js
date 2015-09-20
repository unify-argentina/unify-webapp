unifyApp.controller('VideoController', function($scope, video, $modal) {
	var videoController = this;
  $scope.open = function (source) {
    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      resolve: {
        source: function () {
          return source;
        }
      }
    });
   };
});

unifyApp.controller('ModalInstanceCtrl', function ($scope, $modalInstance, source, video) {
	video.addSource('mp4', source, true); 
});