unifyApp.controller("ProfileController", function ($scope, ProfileService, AuthenticationService) {

	ProfileService.user.get({
		user_id: AuthenticationService.getUserId()
	},function(response){
		$scope.user=response.user;
        localStorage.setItem('response', JSON.stringify(response));
	});

	$scope.authenticate = function(provider) {
		AuthenticationService.authenticate(provider);
	};

	$scope.unlink = function(provider) {
		AuthenticationService.unlink(provider);
	};

	$scope.edit = function(){
		$scope.newUser={};
		$scope.newUser.name=$scope.user.name;
		$scope.newUser.email=$scope.user.email;
		$scope.editProfile=true;
	}

	$scope.save = function(){
		ProfileService.saveUser(
			AuthenticationService.getUserId(),
			$scope.newUser
		).then(function(data) {
			$scope.user.name=$scope.newUser.name;
			$scope.user.email=$scope.newUser.email;
			$scope.editProfile=false;
		});
	};

});