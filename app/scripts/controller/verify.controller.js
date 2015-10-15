unifyApp.controller("VerifyController", function ($state, $timeout, $rootScope, $stateParams, AuthenticationService) {
	var vrfCrtl=this;

	AuthenticationService.verifyAccount(
		$stateParams.token
	).then(function(data){
		if(data!=null && data.errors!=null){
           $rootScope.errorMsg = response.errors[0].msg;
		}
		vrfCrtl.response=true;
		$timeout(function() {
		   $state.go('main');
		}, 3000);
	});
			
});