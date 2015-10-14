unifyApp.directive('uwQuestion', function() {

	var link = function(scope, elm, attrs, ctrl) {
        
    };

    return {
        restrict: 'E',
        link: link,
        templateUrl: 'views/question.html',
        scope:{
        	uwDescription: "="
        }
    };
});