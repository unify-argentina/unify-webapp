
unifyApp.factory('ProfileService', 	function($http, $resource, ENV) {

		var user = $resource(ENV.apiEndPoint+'/api/user/:user_id', {
			user_id: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});

		var saveUser = function(user_id, user){
			 var promise = $http.put(ENV.apiEndPoint + '/api/user/' + user_id, 
				{
					user_id : user_id, 
					email : user.email, 
					name : user.name, 
					password : user.password, 
					confirm_password : user.confirm_password
				}
			).then(function(response) {	
        		return response.data;
			}, function(response) {
	        	console.log("ERROR: "+response.data ? response.data.errors : response);
			});	
			return promise;
		};

		var getFeed = function(user_id){
			 var promise = $http.get(ENV.apiEndPoint + '/api/user/'+user_id+'/media')
			 .then(function(response) {	
        		return response.data;
			}, function(response) {
	        	console.log("ERROR: "+response.data ? response.data.errors : response);
			});	
			return promise;
		};

	return{
		user 		: user,
		saveUser	: saveUser,
		getFeed		: getFeed
	}
});
