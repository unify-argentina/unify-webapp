unifyApp.directive('uwPublicInput', function($rootScope, PublicationService, AuthenticationService) {
  	var link = function(scope, elm, attrs, ctrl) {
       	scope.publicate = function(parent){
            
            if(scope.publication.image==null){
                PublicationService.publicState(
                    AuthenticationService.getUserId(),
                    scope.publication
                ).then(function(data) {
                    if(data.errors==null){
                        parent.getFeed();
                        scope.init();
                    }else{
                       $rootScope.errorMsg = data.errors[0].msg;
                    }
                });
            }else{
                if(scope.publication.image!=null){
                    scope.publication.file=scope.publication.image;
                }
                if(scope.publication.video!=null){
                    scope.publication.file=scope.publication.video;
                }
                PublicationService.publicFile(
                    AuthenticationService.getUserId(),
                    scope.publication
                ).then(function(data) {
                    if(data.errors==null){
                        parent.getFeed();
                        scope.init();
                    }else{
                       $rootScope.errorMsg = data.errors[0].msg;
                    }
                });
            }
            
        };

        scope.init = function(){
            scope.publication = {};
            scope.publication.type='text';
            scope.publication.facebook=true;
            scope.publication.twitter=true;
        };

       scope.uploadImage = function() {
            document.getElementById('imageUploadInput').click();
        };

        scope.$watch('publication.uploadingImage', function(newValue, oldValue) {
            if(newValue!=null){
                scope.publication.image=scope.publication.uploadingImage;
            }
        });

        scope.uploadVideo = function() {
            console.log("uploadVideo");
            document.getElementById('videoUploadInput').click();
        };

        scope.$watch('publication.uploadingVideo', function(newValue, oldValue) {
            console.log(newValue);
            if(newValue!=null){
                scope.publication.video=scope.publication.uploadingVideo;
            }
        });
        scope.init();
    };
    return {
        restrict: 'E',
        link: link,
        templateUrl: 'views/publicInput.html',
        scope:{
            uwParent: "="
        }
    };
});