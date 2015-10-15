

unifyApp.controller("MainController", function ($scope, $modal, $translate, $state, $auth, $rootScope, ENV, ProfileService, AuthenticationService) {
	var mainController=this;
	
	mainController.logout = function(){
		AuthenticationService.logout();
	}
	
	mainController.goToMain =function(){
		if($state.current.name=='main'){
			$state.reload();
		}else{
			$state.go('main');
		}
	}

	mainController.goToMails =function(){
		if($rootScope.email){
			if($state.current.name=='emails'){
				$state.reload();
			}else{
				$state.go('emails');
			}
		}else{
			$state.go('editProfile');
		}
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
			$rootScope.hasFacebook=response.user.facebook != null;
			$rootScope.hasTwitter=response.user.twitter != null;
			AuthenticationService.setValidLocalUser(response.user.valid_local_user);	
		});
	}

	$rootScope.auth=$auth.isAuthenticated();
	
});

unifyApp.controller('ModalPhotoCtrl', function ($scope, $modalInstance, source) {
    console.log(source);
    modalPhotoCtrl = this;
    modalPhotoCtrl.source=source;
});