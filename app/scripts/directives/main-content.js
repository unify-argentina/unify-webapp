unifyApp.directive('uwMainContent', function($auth) {

    var link = function(scope, elm, attrs, ctrl) {
    };

    return {
        restrict: 'E',
        link: link,
        templateUrl: function(elem, attr){
            if($auth.isAuthenticated()){
                return 'views/circle.html';
            }
            return 'views/comingSoon.html';
        }
    };    
});