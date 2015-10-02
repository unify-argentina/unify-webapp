unifyApp.controller("CircleController", function ($scope, video, $stateParams, CircleService, AuthenticationService) {

	var circleCtrl = this;
	if(!$stateParams.circle_id){
		circleCtrl.circle_id = AuthenticationService.getMainCircleId();
	}else{
		circleCtrl.circle_id = $stateParams.circle_id;
	}
	circleCtrl.mainCircle_id = AuthenticationService.getMainCircleId();
	
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
			circleCtrl.parent=circleCtrl.circle.parent;
			circleCtrl.getCircleList();
		});
	};

	circleCtrl.deleteCircle = function(){
		var parent = circleCtrl.circle.parent;
		CircleService.circle.delete({
			user_id : AuthenticationService.getUserId(),
			circle_id : circleCtrl.circle_id
		},function(response){
			circleCtrl.goToCircle(parent);
		});
	};

	circleCtrl.create = function(){
		circleCtrl.createCircle=true;
		circleCtrl.newCircle = {};
	};

	circleCtrl.edit = function(){
		circleCtrl.editingCircle=true;
       	circleCtrl.editCircle = angular.copy(circleCtrl.circle);
	};

	circleCtrl.moveCircle = function(){
		circleCtrl.circle.user_id = AuthenticationService.getUserId();
		circleCtrl.circle.parent=circleCtrl.parent;
		CircleService.updateCircle(
			circleCtrl.circle
		).then(function(data) {
			circleCtrl.movingCircle=false;
		});
	};

	circleCtrl.updateCircle = function(){
		circleCtrl.editCircle.user_id = AuthenticationService.getUserId();
		CircleService.updateCircle(
			circleCtrl.editCircle
		).then(function(data) {
			circleCtrl.circle=circleCtrl.editCircle;
			circleCtrl.editingCircle=false;
		});
	};

	circleCtrl.saveCircle = function(){
		circleCtrl.newCircle.user_id = AuthenticationService.getUserId();
		circleCtrl.newCircle.parent = circleCtrl.circle_id;
		CircleService.saveCircle(
			circleCtrl.newCircle
		).then(function(data) {
			circleCtrl.getCircleTree();
			circleCtrl.createCircle=false;
		});
	};

	circleCtrl.cancelCircle = function(){
		circleCtrl.createCircle = false;
		circleCtrl.newCircle = {};
		circleCtrl.editingCircle=false;
		circleCtrl.editCircle = circleCtrl.circle;
	};

	circleCtrl.getCircleTree = function(){
		CircleService.getCircleTree(
			AuthenticationService.getUserId(),
			circleCtrl.circle_id
		).then(function(data) {
			circleCtrl.tree=data.tree[0];
		});
	};

	circleCtrl.getCircleList = function(){
		CircleService.getCircleListExcluding(
			AuthenticationService.getUserId(),
			AuthenticationService.getMainCircleId(),
			circleCtrl.circle_id
		).then(function(data) {
			circleCtrl.list=data;
			/*_(circleCtrl.list).forEach(function(circle) {
				circle.checked= (circleCtrl.circle.parent==circle._id);
			}).value();*/
		});
	};

	circleCtrl.getCircleFeed = function(){
		circleCtrl.feed=null;
		CircleService.getCircleFeed(
			AuthenticationService.getUserId(),
			circleCtrl.circle_id
		).then(function(data) {
			if(data.circle_id==circleCtrl.circle_id)
			{
				circleCtrl.feed=data.media;
			}
		});
	};
	
	circleCtrl.goToCircle = function(circle_id){
		circleCtrl.circle_id = circle_id;
		circleCtrl.cancelContact();
		circleCtrl.cancelCircle();
		circleCtrl.getCircle();
		circleCtrl.getCircleTree();
		circleCtrl.getCircleFeed();
	}

	circleCtrl.goToParent = function(){
		circleCtrl.circle_id = circleCtrl.circle.parent;
		circleCtrl.cancelContact();
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

