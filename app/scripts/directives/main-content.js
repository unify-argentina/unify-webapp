unifyApp.directive('uwMainContent', function($auth) {

    var link = function(scope, elm, attrs, ctrl) {
        console.log($auth.isAuthenticated());
    };

    return {
        restrict: 'E',
        link: link,
        templateUrl: function(elem, attr){
            if($auth.isAuthenticated()){
                return 'views/dashboard.html';
            }
            return 'views/loginSignUp.html';
        }
    };    
});