unifyApp.controller("CircleController", function ($scope,  video, CircleService, AuthenticationService) {

	var circleCtrl = this;

	circleCtrl.circle_id = AuthenticationService.getMainCircleId();

	circleCtrl.getCircle = function(){
		circleCtrl.circle=null;
		CircleService.circle.get({
			user_id : AuthenticationService.getUserId(),
			circle_id : circleCtrl.circle_id
		},function(response){
			circleCtrl.circle=response.circle;
			if(!circleCtrl.circle.picture){
				if(circleCtrl.circle.contacts){
					circleCtrl.contactSize=_.size(circleCtrl.circle.contacts);
					circleCtrl.imagesCircle={}
					if(circleCtrl.contactSize > 0){
						var limit= (circleCtrl.contactSize < 4 ? circleCtrl.contactSize : 4);
						circleCtrl.imagesCircle=_.sample(circleCtrl.circle.contacts, 4);
					}
				}else{
					circleCtrl.contactSize=0;
				}
			}
		});
	};

	circleCtrl.deleteCircle = function(){
		circleCtrl.circle=null;
		CircleService.circle.delete({
			user_id : AuthenticationService.getUserId(),
			circle_id : circleCtrl.circle_id
		},function(response){
			circleCtrl.circle=response.circle;
	        localStorage.setItem('response', JSON.stringify(response));
		});
	};

	circleCtrl.edit = function(){
		circleCtrl.editCircle=true;
		circleCtrl.newCircle = {};
	};

	circleCtrl.updateCircle = function(){
		CircleService.updateCircle(
			AuthenticationService.getUserId(),
			circleCtrl.newUser
		).then(function(data) {
			console.log("Save: " + data);
			circleCtrl.user.name=circleCtrl.newUser.name;
			circleCtrl.user.email=circleCtrl.newUser.email;
			circleCtrl.editCircle=false;
		});
	};

	circleCtrl.saveCircle = function(){
		circleCtrl.newCircle.user_id = AuthenticationService.getUserId();
		circleCtrl.newCircle.parent = circleCtrl.circle_id;
		CircleService.saveCircle(
			circleCtrl.newCircle
		).then(function(data) {
			circleCtrl.getCircleTree();
			circleCtrl.editCircle=false;
		});
	};

	circleCtrl.cancelCircle = function(){
		circleCtrl.editCircle = false;
		circleCtrl.newCircle = {};
	};

	circleCtrl.getCircleTree = function(){
		CircleService.getCircleTree(
			AuthenticationService.getUserId(),
			circleCtrl.circle_id
		).then(function(data) {
			circleCtrl.tree=data.tree[0];
		});
	};

	circleCtrl.getCircleFeed = function(){
		circleCtrl.feed=null;
		CircleService.getCircleFeed(
			AuthenticationService.getUserId(),
			circleCtrl.circle_id
		).then(function(data) {
			circleCtrl.feed=data.media;
		});
	};
	
	circleCtrl.goToChild = function(circle_id){
		circleCtrl.circle_id = circle_id;
		circleCtrl.cancelCircle();
		circleCtrl.getCircle();
		circleCtrl.getCircleTree();
		circleCtrl.getCircleFeed();
	}

	circleCtrl.goToParent = function(){
		circleCtrl.circle_id = circleCtrl.circle.parent;
		circleCtrl.cancelCircle();
		circleCtrl.getCircle();
		circleCtrl.getCircleTree();
		circleCtrl.getCircleFeed();
	}
	
	circleCtrl.createContact = function(){
		circleCtrl.editContact=true;
		circleCtrl.contact_id=null;
	}
	
	circleCtrl.closeContact = function(){
		circleCtrl.editContact = false;
		circleCtrl.getCircle();
		circleCtrl.getCircleTree();
		circleCtrl.getCircleFeed();
	};

	circleCtrl.cancelContact = function(){
		circleCtrl.editContact = false;
	};

	circleCtrl.getCircleTree();
	circleCtrl.getCircle();
	circleCtrl.getCircleFeed();
	




});

