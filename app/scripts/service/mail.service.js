
unifyApp.factory('MailService', function($http, ENV) {

		var getInbox = function(user_id){
			 var promise = $http.get(ENV.apiEndPoint + '/api/user/'+user_id+'/email/inbox')
			 .then(function(response) {	
        		return response.data;
			}, function(response) {
	        	console.log("ERROR: "+response.data ? response.data.errors : response);
			});	
			return promise;
		};

		var getDraft = function(user_id){
			 var promise = $http.get(ENV.apiEndPoint + '/api/user/'+user_id+'/email/draft')
			 .then(function(response) {	
        		return response.data;
			}, function(response) {
	        	console.log("ERROR: "+response.data ? response.data.errors : response);
			});	
			return promise;
		};
		
		var getSent = function(user_id){
			 var promise = $http.get(ENV.apiEndPoint + '/api/user/'+user_id+'/email/sent')
			 .then(function(response) {	
        		return response.data;
			}, function(response) {
	        	console.log("ERROR: "+response.data ? response.data.errors : response);
			});	
			return promise;
		};
		
		var getTrash = function(user_id){
			 var promise = $http.get(ENV.apiEndPoint + '/api/user/'+user_id+'/email/trash')
			 .then(function(response) {	
        		return response.data;
			}, function(response) {
	        	console.log("ERROR: "+response.data ? response.data.errors : response);
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