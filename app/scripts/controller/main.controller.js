

unifyApp.controller("MainController", function ($translate, $auth, ENV, AuthenticationService) {
	var mainController=this;
	if($auth.isAuthenticated()){
		AuthenticationService.getFriends();
	}
	mainController.auth=$auth.isAuthenticated();

	mainController.logout = function(){
		AuthenticationService.logout();
	}
});