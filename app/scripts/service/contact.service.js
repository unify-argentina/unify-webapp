
unifyApp.factory('ContactService', 	function($http, $resource, ENV) {

		var contact = $resource(ENV.apiEndPoint+'/api/user/:user_id/contact/:contact_id', {
			contact_id: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});

		var saveContact = function(contact){
			console.log(contact.email);
			var promise = $http.post(ENV.apiEndPoint + '/api/user/' + contact.user_id + '/contact', 
				{
					user_id : contact.user_id,
					name : contact.name,
					picture : contact.picture,
					circles_ids : contact.circles_ids,
					facebook_id : (contact.facebook!=null?contact.facebook.id:undefined),
					twitter_id : (contact.twitter!=null?contact.twitter.id:undefined),
					instagram_id : (contact.instagram!=null?contact.instagram.id:undefined),
					facebook_display_name : (contact.facebook!=null?contact.facebook.name:undefined),
					twitter_username : (contact.twitter!=null?contact.twitter.username:undefined),	
					instagram_username : (contact.instagram!=null?contact.instagram.username:undefined),
					email : (contact.google!=null ? contact.google.email : undefined)
				}
			).then(function(response) {	
        		return response.data;
			}, function(response) {
				return response.data;
			});
			return promise;
		};

		var updateContact = function(contact){
			console.log(contact.email);
			var promise = $http.put(ENV.apiEndPoint + '/api/user/' + contact.user_id + '/contact/' + contact._id, 
				{
					user_id : contact.user_id,
					contact_id : contact._id,
					name : contact.name,
					picture : contact.picture,
					circles_ids : contact.circles_ids,
					facebook_id : (contact.facebook!=null?contact.facebook.id:undefined),
					twitter_id : (contact.twitter!=null?contact.twitter.id:undefined),
					instagram_id : (contact.instagram!=null?contact.instagram.id:undefined),
					facebook_display_name : (contact.facebook!=null?contact.facebook.name:undefined),
					twitter_username : (contact.twitter!=null?contact.twitter.username:undefined),	
					instagram_username : (contact.instagram!=null?contact.instagram.username:undefined),
					email : (contact.google!=null ? contact.google.email : undefined)

				}
			).then(function(response) {	
        		return response.data;
			}, function(response) {
				return response.data;
			});
			return promise;
		};

		var getContactFeed = function(user_id, contact_id){
			 var promise = $http.get(ENV.apiEndPoint + '/api/user/'+user_id+'/contact/'+contact_id+'/media')
			 .then(function(response) {	
        		return response.data;
			}, function(response) {
				return response.data;
			});
			return promise;
		};

	return{
		contact 		: contact,
		saveContact		: saveContact,
		updateContact	: updateContact,
		getContactFeed	: getContactFeed 
	}
});
