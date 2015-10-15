unifyApp.controller("ProfileController", function (ProfileService, $scope, $rootScope, FileService, AuthenticationService) {

	var profileCtlr = this;

	ProfileService.user.get({
		user_id: AuthenticationService.getUserId()
	},function(response){
		profileCtlr.user=response.user;
		profileCtlr.checkPic();
	});

	profileCtlr.checkPic = function() {
		if(profileCtlr.user.facebook !=null && profileCtlr.user.picture == profileCtlr.user.facebook.picture){
			profileCtlr.user.pictureUploaded=null;
			return;
		}
		if(profileCtlr.user.twitter !=null && profileCtlr.user.picture == profileCtlr.user.twitter.picture){
			profileCtlr.user.pictureUploaded=null;
			return;
		}
		if(profileCtlr.user.instagram !=null && profileCtlr.user.picture == profileCtlr.user.instagram.picture){
			profileCtlr.user.pictureUploaded=null;
			return;
		}
		if(profileCtlr.user.google !=null && profileCtlr.user.picture == profileCtlr.user.google.picture){
			profileCtlr.user.pictureUploaded=null;
			return;
		}
		profileCtlr.user.pictureUploaded=profileCtlr.user.picture;
	};

	profileCtlr.uploadFile = function() {
        document.getElementById('fileUploadInput').click();
    };

    $scope.$watch('profileCtlr.newUser.uploadingFile', function(newValue, oldValue) {
		if(newValue!=null){
			profileCtlr.newUser.file=profileCtlr.newUser.uploadingFile;
			profileCtlr.newUser.pictureFromFile=true;
		}else{
			if(profileCtlr.newUser){
				profileCtlr.newUser.pictureFromFile=(profileCtlr.newUser.file!=null);
			}
		}
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

	profileCtlr.savePassword = function(){
		ProfileService.savePassword(
			AuthenticationService.getUserId(),
			profileCtlr.password
		).then(function(data) {
			if(data.errors==null){
				profileCtlr.editPassword=false;
            }else{
               $rootScope.errorMsg = data.errors[0].msg;
			}
		});
	};

	profileCtlr.save = function(){
		if(profileCtlr.newUser.pictureFromFile){
			profileCtlr.saveFile();
		}else{
			profileCtlr.saveUser();
		}
	};

	profileCtlr.saveUser = function(){
		ProfileService.saveUser(
			AuthenticationService.getUserId(),
			profileCtlr.newUser
		).then(function(data) {
			if(data.errors==null){
				profileCtlr.user.name=profileCtlr.newUser.name;
				profileCtlr.user.email=profileCtlr.newUser.email;
				profileCtlr.user.picture=profileCtlr.newUser.picture;
				profileCtlr.checkPic();
				$rootScope.user=profileCtlr.newUser.name;
				$rootScope.picture=profileCtlr.newUser.picture;
				$rootScope.email=profileCtlr.newUser.email;
				profileCtlr.editProfile=false;
            }else{
               $rootScope.errorMsg = data.errors[0].msg;
			}
		});
	};


	profileCtlr.saveFile = function(){
		FileService.saveFile(
			profileCtlr.newUser.file
		).then(function(data) {
			if(data.errors==null){
				profileCtlr.newUser.picture=data.url;
				profileCtlr.saveUser()
            }else{
               $rootScope.errorMsg = data.errors[0].msg;
			}
		});
	};

	profileCtlr.getFeed = function(){
		profileCtlr.feed=null;
		ProfileService.getFeed(
			AuthenticationService.getUserId()
		).then(function(data) {
			if(data.errors==null){
				if(data.user_id==AuthenticationService.getUserId())
				{
					profileCtlr.feed=data.media;
				}
            }else{
               $rootScope.errorMsg = data.errors[0].msg;
			}
		});
	};

	profileCtlr.getFeed();
});