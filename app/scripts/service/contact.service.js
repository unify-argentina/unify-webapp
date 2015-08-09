
unifyApp.factory('ContactService', 	function($http, $resource, ENV) {

		var contact = $resource(ENV.apiEndPoint+'/api/user/:user_id/contact/:contact_id', {
			contact_id: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});

		var saveContact = function(contact){
			 var promise = $http.post(ENV.apiEndPoint + '/api/user/' + contact.user_id + '/contact', 
				{
					user_id : contact.user_id,
					contact_id : contact.contact_id,
					name : contact.name,
					picture : contact.picture,
					circle_id : contact.circle_id,
					facebook_id : contact.facebook_id,
					twitter_id : contact.twitter_id,
					instagram_id : contact.instagram_id,
					facebook_display_name : contact.facebook_display_name,
					twitter_username : contact.twitter_username,	
					instagram_username : contact.instagram_username
				}
			).then(function(response) {	
        		return response.data;
			}, function(response) {
	        	console.log("ERROR: "+response.data ? response.data.message : response);
			});	
			return promise;
		};

		var updateContact = function(contact){
			 var promise = $http.put(ENV.apiEndPoint + '/api/user/' + contact.user_id + '/contact/' + contact.contact_id, 
				{
					user_id : contact.user_id,
					contact_id : contact.contact_id,
					name : contact.name,
					picture : contact.picture,
					circle_id : contact.circle_id,
					facebook_id : contact.facebook_id,
					twitter_id : contact.twitter_id,
					instagram_id : contact.instagram_id
				}
			).then(function(response) {	
        		return response.data;
			}, function(response) {
	        	console.log("ERROR: "+response.data ? response.data.message : response);
			});	
			return promise;
		};

		var getFriends = function(user_id){
			 var promise = $http.get(ENV.apiEndPoint + '/api/user/'+ user_id +'/friends')
			 .then(function(response) {	
        		return response.data;
			}, function(response) {
	        	console.log("ERROR: "+response.data ? response.data.message : response);
			});	
			return promise;
		};

	return{
		contact 		: contact,
		saveContact		: saveContact,
		updateContact	: updateContact,
		getFriends		: getFriends
	}
});
