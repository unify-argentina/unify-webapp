unifyApp.controller("VerifyController", function ($state, $timeout, $stateParams, AuthenticationService) {
	var vrfCrtl=this;

	AuthenticationService.verifyAccount(
		$stateParams.token
	).then(function(data){
		if(data!=null && data.errors!=null){
			vrfCrtl.errors=data.errors[0].msg	
		}
		vrfCrtl.response=true;
		$timeout(function() {
		   $state.go('main');
		}, 3000);
	});
			
});