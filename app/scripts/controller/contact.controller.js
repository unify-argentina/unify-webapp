unifyApp.controller("ContactController", function ($scope, ContactService, AuthenticationService) {

	var contactCtrl = this;
	
	contactCtrl.getContact = function(contact_id){
		ContactService.contact.get({
			user_id : AuthenticationService.getUserId(),
			contact_id : contact_id
		},function(response){
			contactCtrl.contact=response.contact;
			contactCtrl.contact.facebook=_.find(contactCtrl.friends.facebook.list, function(friend) {
			  return friend.id == response.contact.facebook.id;
			});
			contactCtrl.contact.twitter=_.find(contactCtrl.friends.twitter.list, function(friend) {
			  return friend.id == response.contact.twitter.id;
			});
			contactCtrl.contact.instagram=_.find(contactCtrl.friends.instagram.list, function(friend) {
			  return friend.id == response.contact.instagram.id;
			});
	        localStorage.setItem('response', JSON.stringify(response));
		});
	};

	contactCtrl.edit = function(){
		contactCtrl.editProfile=true;
		contactCtrl.contact = {};
	};

	contactCtrl.updateContact = function(){
		ContactService.updateContact(
			AuthenticationService.getUserId(),
			contactCtrl.newUser
		).then(function(data) {
			console.log("Save: " + data);
			contactCtrl.user.name=contactCtrl.newUser.name;
			contactCtrl.user.email=contactCtrl.newUser.email;
			contactCtrl.editProfile=false;
		});
	};

	contactCtrl.saveContact = function(){
		contactCtrl.contact.user_id = AuthenticationService.getUserId();
		contactCtrl.contact.circle_id = contactCtrl.circle_id;
		ContactService.saveContact(
			contactCtrl.contact
		).then(function(data) {
			contactCtrl.contact = {};
		});
	};

	contactCtrl.cancelContact = function(){
		contactCtrl.contact = {};
		contactCtrl.contact_id=null;
		contactCtrl.circle_id=null;
		contactCtrl.editProfile = false;
	};

	contactCtrl.getFriends = function(){
		var promise = ContactService.getFriends(
				AuthenticationService.getUserId()
			).then(function(data) {
				if(data){
					contactCtrl.friends=data.friends;
				}
			});	
		return promise;
		
	};

	contactCtrl.init = function(circle_id,contact_id){
		contactCtrl.circle_id=circle_id;
		contactCtrl.contact_id=contact_id;
		contactCtrl.getFriends().then(function() {
			if(contactCtrl.contact_id){
				contactCtrl.getContact(contactCtrl.contact_id);
			}
		});
	};
});