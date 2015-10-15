

unifyApp.service('AuthenticationService', function ($http, $auth, $rootScope, $state, $window, ENV) {

	var userId;
	var mainCircleId;
	var friends;
	var validLocalUser;
	var hasSocialNetworks;
	
    var getUserId = function() {
    	if(userId==null){
    		setUserId(localStorage.getItem(ENV.storageUserId));
    	}
    	return userId; 
	};

    var setUserId = function(value) { 
    	localStorage.setItem(ENV.storageUserId, value);
    	userId=value; 
    };
    
    var getMainCircleId = function() {
    	if(mainCircleId==null){
    		setMainCircleId(localStorage.getItem(ENV.storageMainCircleId));
    	}
    	return mainCircleId; 
	};

    var setMainCircleId = function(value) { 
    	localStorage.setItem(ENV.storageMainCircleId, value);
    	mainCircleId=value; 
    };

	var getFriends = function() {
		return friends;
	};
	var setFriends = function(userFriends) {
		friends=userFriends;
	};

	var getValidLocalUser = function() {
		return validLocalUser;
	};

	var setValidLocalUser = function(valid) {
		validLocalUser=valid;
	};

	var hasSocial = function() {
		if(hasSocialNetworks==null){
    	setSocial(JSON.parse(localStorage.getItem(ENV.storageSocial)));
    	}
    	return hasSocialNetworks; 
	};

	var setSocial = function(value) { 
    	localStorage.setItem(ENV.storageSocial, JSON.stringify(value));
    	hasSocialNetworks=value; 
    };

	var loadDataUser = function(response) {
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
		validLocalUser=response.user.valid_local_user;
	}

    var signup = function(user) {
		console.log(user.name);
		var promise = $auth.signup({
			name: user.name,
			email: user.email,
			password: user.password,
			confirm_password: user.confirmpassword
		}).then(function(response) {
			setUserId(response.data.user._id);
			setMainCircleId(response.data.user.main_circle._id);
	        console.log('You have successfully logged in: '+response.data.token); 
	        loadDataUser(response.data);
	        $rootScope.auth=true;
	        setSocial(false);
			$state.reload();
	      })
		.catch(function(response) {
			return response.data;
		});
		return promise;
    };

    var login = function(user) {
	    var promise = $auth.login({ 
	      email: user.email, 
	      password: user.password 
	    }).then(function(response) {
			setUserId(response.data.user._id);
			setMainCircleId(response.data.user.main_circle._id);
	        console.log('You have successfully logged in: '+response.data.token); 
	        loadDataUser(response.data);
	        $rootScope.auth=true;
	        $rootScope.hasFacebook=response.data.user.facebook != null;
			$rootScope.hasTwitter=response.data.user.twitter != null;
	        setSocial(response.data.user.facebook!=null || response.data.user.twitter!=null || response.data.user.instagram!=null || response.data.user.google!=null);
			$state.reload();
		})
		.catch(function(response) {
			return response.data;
		});
		return promise;
	  };

	var authenticate = function(provider) {
	    var promise = $auth.authenticate(provider)
		.then(function(response) {
			setUserId(response.data.user._id);
			setMainCircleId(response.data.user.main_circle._id);
			console.log('You have successfully logged in: '+response.data.token); 
	        loadDataUser(response.data);
	        $rootScope.auth=true;	        
			$rootScope.hasFacebook=response.data.user.facebook != null;
			$rootScope.hasTwitter=response.data.user.twitter != null;
	        setSocial(response.data.user.facebook!=null || response.data.user.twitter!=null || response.data.user.instagram!=null || response.data.user.google!=null);
			$state.reload();
		})
	    .catch(function(response) {
			return response.data;
		});
		return promise;
	  };

	var unlink  = function(provider) {
		var req = {
			 method: 'DELETE',
		 	url: ENV.apiEndPoint+'/auth/'+provider,
		 	headers: {
		   		'Authorization': 'Bearer'+ ' ' +localStorage.getItem("satellizer_token")
			}
		}
		$http(req)
		.then(function(response) {
	    	localStorage.setItem('satellizer_token', response.data.token);
	        console.log('You have successfully unlogged in: '+response.data.token); 
			$rootScope.hasFacebook=response.data.user.facebook != null;
			$rootScope.hasTwitter=response.data.user.twitter != null;
			setSocial(response.data.user.facebook!=null || response.data.user.twitter!=null || response.data.user.instagram!=null || response.data.user.google!=null);
			$state.reload();
	    })
	    .catch(function(response) {
	        console.log("ERROR: "+response.data ? response.data.message : response);
	    });
	};
	
	var getUserFriends = function(user_id){
		 var promise = $http.get(ENV.apiEndPoint + '/api/user/'+ user_id +'/friends')
		 .then(function(response) {
			localStorage.setItem('response', JSON.stringify(response));
	    	friends=response.data.friends;
    		return response.data.friends;
		}, function(response) {
			return response.data;
		});	
		return promise;
	};

	var recoverPassword = function(email){
		var promise = $http.post(ENV.apiEndPoint + '/auth/recover', 
			{
				email : email,
			}
		).then(function(response) {	
    		return response.data;
		});
		return promise;
	};

	var logout = function(){
		localStorage.clear();
		$rootScope.auth=false;
		if($state.current.name=='main'){
			$state.reload();
		}else{
			$state.go('main');
		}
	};

	var verifyAccount = function(token){
		 var promise = $http.get(ENV.apiEndPoint + '/auth/verify/'+token)
		 .then(function(response) {
    		return response.data;
		}, function(response) {
			return response.data;
		});	
		return promise;
	};

	return {
		signup 				: signup,
		login 				: login,
		authenticate 		: authenticate,
		unlink				: unlink,
		getUserId 			: getUserId,
		getMainCircleId		: getMainCircleId,
		getFriends			: getFriends,
		getUserFriends		: getUserFriends,
		logout				: logout,
		recoverPassword		: recoverPassword,
		getValidLocalUser	: getValidLocalUser,
		setValidLocalUser	: setValidLocalUser,
		setSocial 			: setSocial,
		hasSocial 			: hasSocial,
		verifyAccount		: verifyAccount
    };

});