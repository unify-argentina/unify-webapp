unifyApp.directive('uwPublicInput', function() {
  	var link = function(scope, elm, attrs, ctrl) {
        scope.publication = {};
        scope.publication.type='text';

       	scope.like = function(){
            console.log("PROBANDO");
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