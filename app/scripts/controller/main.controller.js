

unifyApp.controller("MainController", function ($translate, $auth, $rootScope, ENV, ProfileService, AuthenticationService) {
	var mainController=this;
	
	mainController.logout = function(){
		AuthenticationService.logout();
	}
	
	if($auth.isAuthenticated()){
		AuthenticationService.getFriends();
		ProfileService.user.get({
			user_id: AuthenticationService.getUserId()
		},function(response){
			if(response.user.name!=null){
				$rootScope.user=response.user.name;
				$rootScope.picture=response.user.picture;
			}else{
				if(response.user.mail!=null){
					$rootScope.user=response.user.mail;
				}else{
					$rootScope.user="Usuario Unify";
				}
			}
			$rootScope.email=(response.user.google!=null?response.user.google.email:null);
			AuthenticationService.setValidLocalUser(response.user.valid_local_user);	
		});
	}

	$rootScope.auth=$auth.isAuthenticated();
	
});