
unifyApp.factory('MailService', function($http, ENV) {

		var getInbox = function(user_id){
			var promise = $http.get(ENV.apiEndPoint + '/api/user/'+user_id+'/email/inbox')
			.then(function(response) {	
	        	console.log("ERROR: "+response.data ? response.data : response);
        		return response.data;
			}, function(response) {
				return response.data;
			});
			return promise;
		};

		var getDraft = function(user_id){
			 var promise = $http.get(ENV.apiEndPoint + '/api/user/'+user_id+'/email/draft')
			 .then(function(response) {	
        		return response.data;
			});
			return promise;
		};
		
		var getSent = function(user_id){
			 var promise = $http.get(ENV.apiEndPoint + '/api/user/'+user_id+'/email/sent')
			 .then(function(response) {	
        		return response.data;
			}, function(response) {
	        	console.log("ERROR: "+response.data ? response.data.errors : response);
				return response.data;
			});
			return promise;
		};
		
		var getTrash = function(user_id){
			 var promise = $http.get(ENV.apiEndPoint + '/api/user/'+user_id+'/email/trash')
			 .then(function(response) {	
        		return response.data;
			}, function(response) {
	        	console.log("ERROR: "+response.data ? response.data.errors : response);
				return response.data;
			});
			return promise;
		};
		
		var sendMail = function(mail){
			 var promise = $http.post(ENV.apiEndPoint + '/api/user/' + mail.user_id + '/email', 
				{
					user_id : mail.user_id,
					to	: mail.to,
					cc	: mail.cc,
					cco	: mail.cco,
					subject	: mail.subject,
					text : mail.text
				}
			).then(function(response) {	
        		return response.data;
			}, function(response) {
	        	console.log("ERROR: "+response.data ? response.data.errors : response);
				return response.data;
			});
			return promise;
		};

		var markAsSeen = function(user_id, email_ids){
			 var promise = $http.post(ENV.apiEndPoint + '/api/user/' + user_id + '/email/seen', 
				{
					email_ids : email_ids
				}
			).then(function(response) {	
        		return response.data;
			}, function(response) {
	        	console.log("ERROR: "+response.data ? response.data.errors : response);
				return response.data;
			});
			return promise;
		};

		var markAsUnseen = function(user_id, email_ids){
			 var promise = $http.post(ENV.apiEndPoint + '/api/user/' + user_id + '/email/unseen', 
				{
					email_ids : email_ids
				}
			).then(function(response) {	
        		return response.data;
			}, function(response) {
	        	console.log("ERROR: "+response.data ? response.data.errors : response);
				return response.data;
			});
			return promise;
		};

		var moveToTrash = function(user_id, email_ids){
			 var promise = $http.post(ENV.apiEndPoint + '/api/user/' + user_id + '/email/trash', 
				{
					email_ids : email_ids
				}
			).then(function(response) {	
        		return response.data;
			}, function(response) {
	        	console.log("ERROR: "+response.data ? response.data.errors : response);
				return response.data;
			});
			return promise;
		};

		var moveToInbox = function(user_id, email_ids){
			 var promise = $http.post(ENV.apiEndPoint + '/api/user/' + user_id + '/email/untrash', 
				{
					email_ids : email_ids
				}
			).then(function(response) {	
        		return response.data;
			}, function(response) {
	        	console.log("ERROR: "+response.data ? response.data.errors : response);
				return response.data;
			});
			return promise;
		};

	return{
		getInbox		: getInbox,
		getDraft		: getDraft,
		getSent			: getSent,
		getTrash		: getTrash,
		sendMail		: sendMail,
		markAsSeen		: markAsSeen,
		markAsUnseen	: markAsUnseen,
		moveToTrash		: moveToTrash,
		moveToInbox		: moveToInbox
	}
});