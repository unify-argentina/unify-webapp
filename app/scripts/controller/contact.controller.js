unifyApp.controller("ContactController", function ($scope, $state, $interval, ContactService, AuthenticationService) {

	var contactCtrl = this;

	contactCtrl.getContact = function(contact_id){
		ContactService.contact.get({
			user_id : AuthenticationService.getUserId(),
			contact_id : contact_id
		},function(response){
			contactCtrl.contact=response.contact;
			if(contactCtrl.friends){
				console.log("SEEEEEE");
				contactCtrl.getFriends();
			}else{
				console.log("No :(");
				contactCtrl.checkFriends();
			}
		});
	};

	contactCtrl.getFriends = function(){	
		if(contactCtrl.friends){	
			if(contactCtrl.contact.facebook && contactCtrl.friends.facebook_friends){
				contactCtrl.contact.facebook=_.find(contactCtrl.friends.facebook_friends.list, function(friend) {
				  return friend.id == contactCtrl.contact.facebook.id;
				});
			}
			if(contactCtrl.contact.twitter && contactCtrl.friends.twitter){
				contactCtrl.contact.twitter=_.find(contactCtrl.friends.twitter.list, function(friend) {
				  return friend.id == contactCtrl.contact.twitter.id;
				});
			}
			if(contactCtrl.contact.instagram && contactCtrl.friends.instagram){
				contactCtrl.contact.instagram=_.find(contactCtrl.friends.instagram.list, function(friend) {
				  return friend.id == contactCtrl.contact.instagram.id;
				});
			}
		}
	};

	contactCtrl.deleteContact = function(contact_id){
		ContactService.contact.delete({
			user_id : AuthenticationService.getUserId(),
			contact_id : contact_id
		},function(response){
			$state.go("dashboard");
		});
	};

	contactCtrl.edit = function(){
		contactCtrl.editProfile=true;
		contactCtrl.contact = {};
	};

	contactCtrl.saveContact = function(){
		contactCtrl.contact.user_id = AuthenticationService.getUserId();
		contactCtrl.contact.circle_id = contactCtrl.circle_id;
		ContactService.saveContact(
			contactCtrl.contact
		).then(function(data) {
			contactCtrl.parentController.closeContact();
		});
	};

	contactCtrl.updateContact = function(){
		contactCtrl.contact.user_id = AuthenticationService.getUserId();
		contactCtrl.contact.circle_id=contactCtrl.circle_id;
		ContactService.updateContact(
			contactCtrl.contact
		).then(function(data) {
			contactCtrl.parentController.closeContact();
		});
	};

	contactCtrl.cancelContact = function(){
		contactCtrl.contact = {};
		contactCtrl.contact_id=null;
		contactCtrl.circle_id=null;
		contactCtrl.editProfile = false;
	};

	$scope.$watch('contactCtrl.parentController.editContact', function(newValue, oldValue) {
		if(newValue==true && contactCtrl.contact_id){
				contactCtrl.getContact(contactCtrl.contact_id);
		}else{
			contactCtrl.contact = {};
		}
	});

	contactCtrl.init = function(circle_id,contact_id, parentController){
		contactCtrl.circle_id=circle_id;
		contactCtrl.parentController=parentController;
		contactCtrl.contact_id=contact_id;
		if(!AuthenticationService.getFriends()){
			AuthenticationService.getUserFriends(
				AuthenticationService.getUserId()
			).then(function(data){
				console.log(data);
				contactCtrl.friends=data;
				if(contactCtrl.contact_id){
					contactCtrl.getContact(contactCtrl.contact_id);
				}
			});
		}else{
			contactCtrl.friends=AuthenticationService.getFriends();
		}
	};

});