
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
					//password : user.password, 
					//confirm_password : user.confirm_password,
					picture : user.picture
				}
			).then(function(response) {	
        		return response.data;
			}, function(response) {
				return response.data;
			});
			return promise;
		};

		var savePassword = function(user_id, password){
			 var promise = $http.put(ENV.apiEndPoint + '/api/user/' + user_id + '/password', 
				{
					user_id : user_id,
					password : password.password, 
					confirm_password : password.confirm_password,
					old_password : password.old_password
				}
			).then(function(response) {	
        		return response.data;
			}, function(response) {
				return response.data;
			});
			return promise;
		};

		var getFeed = function(user_id){
			 var promise = $http.get(ENV.apiEndPoint + '/api/user/'+user_id+'/media')
			 .then(function(response) {	
        		return response.data;
			}, function(response) {
				return response.data;
			});
			return promise;
		};

	return{
		user 		: user,
		saveUser	: saveUser,
		savePassword: savePassword,
		getFeed		: getFeed
	}
});
