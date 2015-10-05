'use strict';

unifyApp.run(function ($rootScope, $state, $location, $auth) {
  
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState) {
      
      var isAuthenticated = $auth.isAuthenticated();
      console.log(toState.name);
      if(!isAuthenticated && toState.name != "main" && toState.name != "validate")
      {
        $state.go('main');
        event.preventDefault();
        return;
      }
    });
});
    