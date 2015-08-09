

unifyApp.controller("SignUpController",  function ($scope, $state, AuthenticationService) {
    
    $scope.signup = function() {
      AuthenticationService.signup($scope.user);
    };

});