'use strict';

unifyApp.run(function ($rootScope, $state, $location, $auth, AuthenticationService) {
  
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
      
      var isAuthenticated = $auth.isAuthenticated();
      
      if(!isAuthenticated && toState.name != "main" && toState.name != "verify")
      {
        $state.go('main');
        event.preventDefault();
        return;
      }

      if(isAuthenticated && !AuthenticationService.hasSocial() && toState.name != "editProfile"){
        $state.go('editProfile');
        event.preventDefault();
        return;
      }
    });
});
    