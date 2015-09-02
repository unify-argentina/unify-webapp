
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
					name : contact.name,
					picture : contact.picture,
<<<<<<< HEAD
					circles_ids : contact.circles_ids,
=======
					circles_ids : [contact.circle_id],
>>>>>>> dc7d75f9969449e27c1463437c58a5cae92588ec
					facebook_id : (contact.facebook!=null?contact.facebook.id:null),
					twitter_id : (contact.twitter!=null?contact.twitter.id:null),
					instagram_id : (contact.instagram!=null?contact.instagram.id:null),
					facebook_display_name : (contact.facebook!=null?contact.facebook.name:null),
					twitter_username : (contact.twitter!=null?contact.twitter.username:null),	
					instagram_username : (contact.instagram!=null?contact.instagram.username:null)
				}
			).then(function(response) {	
        		return response.data;
			}, function(response) {
	        	console.log("ERROR: "+response.data ? response.data.message : response);
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
<<<<<<< HEAD
					circles_ids : contact.circles_ids,
=======
					circles_ids : [contact.parents[0].circle],
>>>>>>> dc7d75f9969449e27c1463437c58a5cae92588ec
					facebook_id : (contact.facebook!=null?contact.facebook.id:null),
					twitter_id : (contact.twitter!=null?contact.twitter.id:null),
					instagram_id : (contact.instagram!=null?contact.instagram.id:null),
					facebook_display_name : (contact.facebook!=null?contact.facebook.name:null),
					twitter_username : (contact.twitter!=null?contact.twitter.username:null),	
					instagram_username : (contact.instagram!=null?contact.instagram.username:null)
				}
			).then(function(response) {	
        		return response.data;
			}, function(response) {
	        	console.log("ERROR: "+response.data ? response.data.message : response);
			});	
			return promise;
		};

		var getContactFeed = function(user_id, contact_id){
			 var promise = $http.get(ENV.apiEndPoint + '/api/user/'+user_id+'/contact/'+contact_id+'/media')
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
		getContactFeed	: getContactFeed 
	}
});
