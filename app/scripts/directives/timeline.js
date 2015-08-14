unifyApp.directive('uwTimeLine', function() {

    return {
        restrict: 'E',
        templateUrl: 'views/timeline.html',
        scope:{
        	uwMedia: "="
        }
    };
});