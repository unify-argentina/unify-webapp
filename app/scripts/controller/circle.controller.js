unifyApp.controller("CircleController", function ($scope, video, $modal, $rootScope, $stateParams, CircleService, FileService, AuthenticationService) {

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
			if(response.errors==null){
				circleCtrl.circle=response.circle;
				circleCtrl.getImageCircle();
				circleCtrl.parent=circleCtrl.circle.parent;
				circleCtrl.getCircleList();
            }else{
               $rootScope.errorMsg = response.errors[0].msg;
			}
		});
	};
	
	circleCtrl.getImageCircle = function(){
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
	}

	circleCtrl.deleteCircle = function(){
		var parent = circleCtrl.circle.parent;
		CircleService.circle.delete({
			user_id : AuthenticationService.getUserId(),
			circle_id : circleCtrl.circle_id
		},function(response){
			if(response.errors==null){
				circleCtrl.goToCircle(parent);
            }else{
               $rootScope.errorMsg = response.errors[0].msg;
			}
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
			if(data.errors==null){
				circleCtrl.movingCircle=false;
            }else{
               $rootScope.errorMsg = data.errors[0].msg;
			}
		});
	};

	circleCtrl.uploadNewFile = function() {
        document.getElementById('fileNewUploadInput').click();
    };
    
    circleCtrl.uploadFile = function() {
        document.getElementById('fileUploadInput').click();
    };

    $scope.$watch('circleCtrl.newCircle.uploadingFile', function(newValue, oldValue) {
		if(newValue!=null){
			circleCtrl.newCircle.file=circleCtrl.newCircle.uploadingFile;
			circleCtrl.newCircle.pictureFromFile=true;
		}else{
			if(circleCtrl.newCircle){
				circleCtrl.newCircle.pictureFromFile=(circleCtrl.newCircle.file!=null);
			}
		}
	});

    $scope.$watch('circleCtrl.editCircle.uploadingFile', function(newValue, oldValue) {
		if(newValue!=null){
			circleCtrl.editCircle.file=circleCtrl.editCircle.uploadingFile;
			circleCtrl.editCircle.pictureFromFile=true;
		}else{
			if(circleCtrl.editCircle){
				circleCtrl.editCircle.pictureFromFile=(circleCtrl.editCircle.file!=null);
			}
		}
	});

	circleCtrl.update = function(){
		if(circleCtrl.editCircle.pictureFromFile){
			circleCtrl.saveFile(circleCtrl.editCircle.file, false);
		}else{
			circleCtrl.updateCircle();
		}
	};

	circleCtrl.updateCircle = function(){
		circleCtrl.editCircle.user_id = AuthenticationService.getUserId();
		CircleService.updateCircle(
			circleCtrl.editCircle
		).then(function(data) {
			if(data.errors==null){
				circleCtrl.circle.name=circleCtrl.editCircle.name;
				circleCtrl.circle.picture=circleCtrl.editCircle.picture;
				circleCtrl.editCircle = null;
				circleCtrl.getImageCircle();
				circleCtrl.editingCircle=false;
            }else{
               $rootScope.errorMsg = data.errors[0].msg;
			}
		});
	};

	circleCtrl.save = function(){
		if(circleCtrl.newCircle.pictureFromFile){
			circleCtrl.saveFile(circleCtrl.newCircle.file, true);
		}else{
			circleCtrl.saveCircle();
		}
	};

	circleCtrl.saveCircle = function(){
		circleCtrl.newCircle.user_id = AuthenticationService.getUserId();
		circleCtrl.newCircle.parent = circleCtrl.circle_id;
		CircleService.saveCircle(
			circleCtrl.newCircle
		).then(function(data) {
			if(data.errors==null){
				circleCtrl.getCircleTree();
				circleCtrl.createCircle=false;
            }else{
               $rootScope.errorMsg = data.errors[0].msg;
			}
		});
	};

	circleCtrl.saveFile = function(file, save){
		FileService.saveFile(
			file
		).then(function(data) {
			if(save){
				circleCtrl.newCircle.picture=data.url;
				circleCtrl.saveCircle();
			}else{
				circleCtrl.editCircle.picture=data.url;
				circleCtrl.updateCircle();
			}
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
			if(data.errors==null){
				circleCtrl.tree=data.tree[0];
            }else{
               $rootScope.errorMsg = data.errors[0].msg;
			}
		});
	};

	circleCtrl.getCircleList = function(){
		CircleService.getCircleListExcluding(
			AuthenticationService.getUserId(),
			AuthenticationService.getMainCircleId(),
			circleCtrl.circle_id
		).then(function(data) {
			if(data.errors==null){
				circleCtrl.list=data;
            }else{
               $rootScope.errorMsg = data.errors[0].msg;
			}
		});
	};

	circleCtrl.getFeed = function(){
		circleCtrl.feed=null;
		CircleService.getFeed(
			AuthenticationService.getUserId(),
			circleCtrl.circle_id
		).then(function(data) {
			if(data.errors==null){
				if(data.circle_id==circleCtrl.circle_id)
				{
					circleCtrl.feed=data.media;
				}
            }else{
               $rootScope.errorMsg = data.errors[0].msg;
			}
			
		});
	};
	
	circleCtrl.goToCircle = function(circle_id){
		circleCtrl.circle_id = circle_id;
		circleCtrl.cancelContact();
		circleCtrl.cancelCircle();
		circleCtrl.getCircle();
		circleCtrl.getCircleTree();
		circleCtrl.getFeed();
	}

	circleCtrl.goToParent = function(){
		circleCtrl.circle_id = circleCtrl.circle.parent;
		circleCtrl.cancelContact();
		circleCtrl.cancelCircle();
		circleCtrl.getCircle();
		circleCtrl.getCircleTree();
		circleCtrl.getFeed();
	}
	
	circleCtrl.createContact = function(){
		circleCtrl.editContact=true;
		circleCtrl.contact_id=null;
	}
	
	circleCtrl.closeContact = function(){
		circleCtrl.editContact = false;
		circleCtrl.getCircle();
		circleCtrl.getCircleTree();
		circleCtrl.getFeed();
	};

	circleCtrl.cancelContact = function(){
		circleCtrl.editContact = false;
	};

	circleCtrl.askDeleteConfirmation = function () {
	    var modalInstance = $modal.open({
			animation: $scope.animationsEnabled,
			templateUrl: 'myModalCircleDelete.html',
			controller: 'ModalCircleDeleteCtrl',
			resolve: {
				circleCtrl: function () {
					return circleCtrl;
				}
			}
	    });
	};

	circleCtrl.getCircleTree();
	circleCtrl.getCircle();
	circleCtrl.getFeed();
});

unifyApp.controller('ModalCircleDeleteCtrl', function ($scope, $modalInstance, circleCtrl) {
	$scope.deleteCircle = function () {
		circleCtrl.deleteCircle();
        $modalInstance.close();
	};

	$scope.cancel = function () {
		$modalInstance.dismiss('cancel');
	};
});