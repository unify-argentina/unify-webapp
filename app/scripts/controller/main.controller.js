

unifyApp.controller("MainController", function ($translate, $auth, ENV, ProfileService, AuthenticationService) {
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
				mainController.user=response.user.name;
				mainController.picture=response.user.picture;
			}else{
				if(response.user.mail!=null){
					mainController.user=response.user.mail;
				}else{
					mainController.user="Usuario Unify";
				}
			}
			mainController.email=(response.user.google!=null?response.user.google.email:null);
		});
	}

	mainController.auth=$auth.isAuthenticated();
	
});