

unifyApp.controller("LoginController", function ($scope, $auth, AuthenticationService) {
  
  $scope.login = function() {
    AuthenticationService.login($scope.user);
  };

  $scope.authenticate = function(provider) {
    AuthenticationService.authenticate(provider);
  };
});
