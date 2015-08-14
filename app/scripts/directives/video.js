unifyApp.directive('uwVideo', function() {

	var link = function(scope, elm, attrs, ctrl) {
		//console.log(attrs.videoSrc);
		//video.addSource('mp4', attrs.videoSrc, true);
    };

    return {
        restrict: 'E',
        link: link,
        templateUrl: 'views/video.html',
        scope:{
        	videoSrc: "="
        }
    };
});