unifyApp.controller("ContactProfileController", function ($scope, $stateParams, ContactService, AuthenticationService) {

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
		contactCtrl.editContact=true;
	};

	contactCtrl.cancelContact = function(){
		contactCtrl.contact_id=null;
		contactCtrl.circle_id=null;
		contactCtrl.editContact = false;
	};


	contactCtrl.getCircleFeed = function(){
		contactCtrl.feed=null;
		ContactService.getContactFeed(
			AuthenticationService.getUserId(),
			contactCtrl.contact_id
		).then(function(data) {
			contactCtrl.feed=data.media;
		});
	};

	if($stateParams.contact_id){
		contactCtrl.contact_id=$stateParams.contact_id;
		contactCtrl.getContact(contactCtrl.contact_id);
		contactCtrl.getCircleFeed();
	}

});