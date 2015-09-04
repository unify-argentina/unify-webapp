
unifyApp.factory('MailService', function($http, $resource, ENV) {

		var getInbox = function(user_id){
			 var promise = $http.post(ENV.apiEndPoint + '/api/user/'+user_id+'/email/inbox', 
				{
					user_id : user_id
				}
			).then(function(response) {	
        		return response.data;
			}, function(response) {
	        	console.log("ERROR: "+response.data ? response.data.message : response);
			});	
			return promise;
		};

		var getDraft = function(user_id){
			 var promise = $http.post(ENV.apiEndPoint + '/api/user/'+user_id+'/email/draft', 
				{
					user_id : user_id
				}
			).then(function(response) {	
        		return response.data;
			}, function(response) {
	        	console.log("ERROR: "+response.data ? response.data.message : response);
			});	
			return promise;
		};
		
		var getSent = function(user_id){
			 var promise = $http.post(ENV.apiEndPoint + '/api/user/'+user_id+'/email/sent', 
				{
					user_id : user_id
				}
			).then(function(response) {	
        		return response.data;
			}, function(response) {
	        	console.log("ERROR: "+response.data ? response.data.message : response);
			});	
			return promise;
		};
		
		var getTrash = function(user_id){
			 var promise = $http.post(ENV.apiEndPoint + '/api/user/'+user_id+'/email/trash', 
				{
					user_id : user_id
				}
			).then(function(response) {	
        		return response.data;
			}, function(response) {
	        	console.log("ERROR: "+response.data ? response.data.message : response);
			});	
			return promise;
		};
		

	return{
		getInbox : getInbox,
		getDraft : getDraft,
		getSent : getSent,
		getTrash : getTrash
	}
});