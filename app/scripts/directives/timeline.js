unifyApp.directive('uwTimeLine', function() {
  
  	var link = function(scope, elm, attrs, ctrl) {

       

    };
    return {
        restrict: 'E',
        link: link,
        templateUrl: 'views/timeline.html',
        scope:{
        	uwMedia: "=",
        	uwName: "=",
        	uwPicture: "="
        }
    };
});