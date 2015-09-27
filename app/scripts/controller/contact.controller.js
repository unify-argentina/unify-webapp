unifyApp.controller("ContactController", function ($scope, $state, $interval, ContactService, CircleService, AuthenticationService) {

	var contactCtrl = this;

	contactCtrl.getContact = function(contact_id){
		ContactService.contact.get({
			user_id : AuthenticationService.getUserId(),
			contact_id : contact_id
		},function(response){
			response.contact.circles_ids=[];
			_(response.contact.parents).forEach(function(parent) {
			  console.log(parent);
			  response.contact.circles_ids.push(parent.circle);
			}).value();

			contactCtrl.contact=response.contact;
			if(contactCtrl.friends){
				contactCtrl.getFriends();
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

	contactCtrl.check = function(circle){
		if(circle.checked){
			contactCtrl.contact.circles_ids.push(circle._id);
		}else{
			_.pull(contactCtrl.contact.circles_ids,circle._id);
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

	contactCtrl.saveContact = function(id){
		if(id){
			contactCtrl.updateContact();
		}else{
			contactCtrl.saveNewContact();
		}
	};

	contactCtrl.saveNewContact = function(){
		contactCtrl.contact.user_id = AuthenticationService.getUserId();
		ContactService.saveContact(
			contactCtrl.contact
		).then(function(data) {
			contactCtrl.parentController.closeContact();
		});
	};

	contactCtrl.updateContact = function(){
		contactCtrl.contact.user_id = AuthenticationService.getUserId();
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

	contactCtrl.getCircleList = function(){
		CircleService.getCircleList(
			AuthenticationService.getUserId(),
			AuthenticationService.getMainCircleId()
		).then(function(data) {
			contactCtrl.list=data;
			_(contactCtrl.list).forEach(function(circle) {
				console.log(circle);
				circle.checked=_.includes(contactCtrl.contact.circles_ids, circle._id);
			}).value();
		});
	};

	contactCtrl.refreshFriends = function(){
		contactCtrl.friends=null;
		AuthenticationService.getUserFriends(
			AuthenticationService.getUserId()
		).then(function(data){
			contactCtrl.friends=data;
			var pages={};
			pages.name="---Páginas de Facebook---"
			contactCtrl.friends.facebook_friends.list.push(pages);
			contactCtrl.friends.facebook_friends.list=contactCtrl.friends.facebook_friends.list.concat(contactCtrl.friends.facebook_pages.list);
		});
	};

	$scope.$watch('contactCtrl.parentController.editContact', function(newValue, oldValue) {
		if(newValue==true && contactCtrl.contact_id){
			contactCtrl.getContact(contactCtrl.contact_id);
		}else{
			contactCtrl.contact = {};
			contactCtrl.contact.circles_ids = [];
			contactCtrl.contact.circles_ids.push(contactCtrl.circle_id);
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
				contactCtrl.friends=data;
				var pages={};
				pages.name="---Páginas de Facebook---"
				contactCtrl.friends.facebook_friends.list.push(pages);
				contactCtrl.friends.facebook_friends.list=contactCtrl.friends.facebook_friends.list.concat(contactCtrl.friends.facebook_pages.list);
				if(contactCtrl.contact_id){
					contactCtrl.getContact(contactCtrl.contact_id);
				}else{
					contactCtrl.contact.circles_ids = [];
					contactCtrl.contact.circles_ids.push(contactCtrl.circle_id);
				}
				contactCtrl.getCircleList();
			});
		}else{
			contactCtrl.friends=AuthenticationService.getFriends();
			if(contactCtrl.contact_id){
				contactCtrl.getContact(contactCtrl.contact_id);
			}
			contactCtrl.getCircleList();
		}
	};

});