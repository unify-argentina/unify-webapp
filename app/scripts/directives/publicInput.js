unifyApp.directive('uwPublicInput', function() {
  	var link = function(scope, elm, attrs, ctrl) {
       
       	scope.like = function(post){
        };
        scope.unlike = function(post){;
        };
    };
    return {
        restrict: 'E',
        link: link,
        templateUrl: 'views/publicInput.html'
    };
});