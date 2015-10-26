
unifyApp.factory('ContactService', 	function($http, $resource, ENV) {

		var contact = $resource(ENV.apiEndPoint+'/api/user/:user_id/contact/:contact_id', {
			contact_id: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});

		
		var saveContactMultiple = function(user_id, user_ids){
			var promise = $http.post(ENV.apiEndPoint + '/api/user/' + user_id + '/contact/multiple', 
				{
					user_id : user_id,
					user_ids : user_ids
				}
			).then(function(response) {	
        		return response.data;
			}, function(response) {
				return response.data;
			});
			return promise;
		};

		var saveContact = function(contact){
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

		var getMoreContactFeed = function(user_id, contact_id){
			 var promise = $http.get(ENV.apiEndPoint + '/api/user/'+user_id+'/contact/'+contact_id+'/media')
			 .then(function(response) {	
        		return response.data;
			}, function(response) {
				return response.data;
			});
			return promise;
		};

		var like = function(user_id, facebook_id, twitter_id){
			var promise = $http.post(ENV.apiEndPoint + '/api/user/' + user_id + '/media/like', 
				{
					user_id : user_id,
					facebook_media_id : (facebook_id!=null?facebook_id:undefined),
					twitter_media_id : (twitter_id!=null?twitter_id:undefined)

				}
			).then(function(response) {	
        		return response.data;
			}, function(response) {
				return response.data;
			});
			return promise;
		};

		var unlike = function(user_id, facebook_id, twitter_id){
			var promise = $http.post(ENV.apiEndPoint + '/api/user/' + user_id + '/media/unlike', 
				{
					user_id : user_id,
					facebook_media_id : (facebook_id!=null?facebook_id:undefined),
					twitter_media_id : (twitter_id!=null?twitter_id:undefined)

				}
			).then(function(response) {	
        		return response.data;
			}, function(response) {
				return response.data;
			});
			return promise;
		};

		var getRecomendedFriends = function(user_id){
			 var promise = $http.get(ENV.apiEndPoint + '/api/user/'+user_id+'/recomended_friends')
			 .then(function(response) {	
        		return response.data;
			}, function(response) {
				return response.data;
			});
			return promise;
		};

	return{
		contact 				: contact,
		saveContactMultiple		: saveContactMultiple,
		saveContact				: saveContact,
		updateContact			: updateContact,
		getContactFeed			: getContactFeed,
		getMoreContactFeed		: getMoreContactFeed,
		like					: like,
		unlike					: unlike,
		getRecomendedFriends	: getRecomendedFriends
	}
});
