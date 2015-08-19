unifyApp.controller("ProfileController", function (ProfileService, AuthenticationService) {

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
		profileCtlr.editProfile=true;
	}

	profileCtlr.save = function(){
		ProfileService.saveUser(
			AuthenticationService.getUserId(),
			profileCtlr.newUser
		).then(function(data) {
			profileCtlr.user.name=profileCtlr.newUser.name;
			profileCtlr.user.email=profileCtlr.newUser.email;
			profileCtlr.editProfile=false;
		});
	};

	profileCtlr.getFeed = function(){
		profileCtlr.feed=null;
		ProfileService.getFeed(
			AuthenticationService.getUserId()
		).then(function(data) {
			profileCtlr.feed=data.media;
		});
	};

	profileCtlr.getFeed();
});