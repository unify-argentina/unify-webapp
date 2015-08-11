unifyApp.controller("ContactController", function ($scope, ContactService, AuthenticationService) {

	var contactCtrl = this;

	contactCtrl.getContact = function(contact_id){
		ContactService.contact.get({
			user_id : AuthenticationService.getUserId(),
			contact_id : contact_id
		},function(response){
			contactCtrl.contact=response.contact;
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
		contactCtrl.editProfile = false;
		contactCtrl.contact = {};
	};

	contactCtrl.getFriends = function(){
		ContactService.getFriends(
			AuthenticationService.getUserId()
		).then(function(data) {
			if(data){
				contactCtrl.friends=data.friends;
			}
		});
	};

	contactCtrl.getFriends();
});