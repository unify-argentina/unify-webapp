

unifyApp.service('AuthenticationService', function ($http, $auth, $state, $window, ENV) {

	var userId;
	var mainCircleId;
	var friends;
	
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

    var signup = function(user) {
		console.log(user.name);
		$auth.signup({
			name: user.name,
			email: user.email,
			password: user.password,
			confirm_password: user.confirmpassword
		}).then(function(response) {
			setUserId(response.data.user._id);
			setMainCircleId(response.data.user.main_circle._id);
			localStorage.setItem('response', JSON.stringify(response));
	        console.log('You have successfully logged in: '+response.data.token); 
			$window.location.href = "/";
	      })
		.catch(function(response) {
	        console.log(response.data ? response.data.message : response);
		});
    };

    var login = function(user) {
	    $auth.login({ 
	      email: user.email, 
	      password: user.password 
	    }).then(function(response) {
			setUserId(response.data.user._id);
			setMainCircleId(response.data.user.main_circle);
	        localStorage.setItem('response', JSON.stringify(response));
	        console.log('You have successfully logged in: '+response.data.token); 
			$window.location.href = "/";
		})
		.catch(function(response) {
			console.log(response.data ? response.data.message : response);
		});
	  };

	var authenticate = function(provider) {
	    $auth.authenticate(provider)
	      .then(function(response) {
			setUserId(response.data.user._id);
			setMainCircleId(response.data.user.main_circle);
	        localStorage.setItem('response', JSON.stringify(response));
	        console.log('You have successfully logged in: '+response.data.token); 
			$window.location.href = "/";
	      })
	      .catch(function(response) {
	        console.log(response.data ? response.data.message : response);
	      });
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
	    	localStorage.setItem('response', JSON.stringify(response));
	    	localStorage.setItem('satellizer_token', response.data.token);
	        console.log('You have successfully unlogged in: '+response.data.token); 
			$window.location.href = "/";
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
        	console.log("ERROR: "+response.data ? response.data.message : response);
		});	
		return promise;
	};

	var logout = function(){
		localStorage.clear();
		$window.location.href = "/";
	};

	return {
		signup 			: signup,
		login 			: login,
		authenticate 	: authenticate,
		unlink			: unlink,
		getUserId 		: getUserId,
		getMainCircleId	: getMainCircleId,
		getFriends		: getFriends,
		getUserFriends	: getUserFriends,
		logout			: logout
    };

});