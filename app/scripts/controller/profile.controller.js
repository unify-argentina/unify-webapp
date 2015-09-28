unifyApp.controller("ProfileController", function (ProfileService, $rootScope, FileService, AuthenticationService) {

	var profileCtlr = this;

	ProfileService.user.get({
		user_id: AuthenticationService.getUserId()
	},function(response){
		profileCtlr.user=response.user;
	});

	profileCtlr.authenticate = function(provider) {
		AuthenticationService.authenticate(provider);

	};

	profileCtlr.unlink = function(provider) {
		AuthenticationService.unlink(provider);
	};

	profileCtlr.edit = function(){
		profileCtlr.newUser={};
		profileCtlr.newUser.name=profileCtlr.user.name;
		profileCtlr.newUser.email=profileCtlr.user.email;
		profileCtlr.newUser.picture=profileCtlr.user.picture;
		profileCtlr.editPassword=false;
		profileCtlr.editProfile=true;
	}

	profileCtlr.editPass = function(){
		profileCtlr.validLocalUser=AuthenticationService.getValidLocalUser();
		profileCtlr.editPassword=true;
		profileCtlr.editProfile=false;
	}

	profileCtlr.saveFile = function(){
		FileService.saveFile(
			profileCtlr.newUser.file
		).then(function(data) {
			console.log(data);
		});
	};

	profileCtlr.savePassword = function(){
		ProfileService.savePassword(
			AuthenticationService.getUserId(),
			profileCtlr.password
		).then(function(data) {
			console.log(data);
			if(data.errors){
				profileCtlr.errors=data.errors[0].msg;
			}else{
				profileCtlr.editPassword=false;
			}
		});
	};

	profileCtlr.save = function(){
		ProfileService.saveUser(
			AuthenticationService.getUserId(),
			profileCtlr.newUser
		).then(function(data) {
			profileCtlr.user.name=profileCtlr.newUser.name;
			profileCtlr.user.email=profileCtlr.newUser.email;
			profileCtlr.user.picture=profileCtlr.newUser.picture;
			$rootScope.user=profileCtlr.newUser.name;
			$rootScope.picture=profileCtlr.newUser.picture;
			$rootScope.email=profileCtlr.newUser.email;
			profileCtlr.editProfile=false;
		});
	};

	profileCtlr.getFeed = function(){
		profileCtlr.feed=null;
		ProfileService.getFeed(
			AuthenticationService.getUserId()
		).then(function(data) {
			if(data.user_id==AuthenticationService.getUserId())
			{
				profileCtlr.feed=data.media;
			}
		});
	};

	profileCtlr.getFeed();
});