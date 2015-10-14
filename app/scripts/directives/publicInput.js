unifyApp.directive('uwPublicInput', function($rootScope, PublicationService, AuthenticationService) {
  	var link = function(scope, elm, attrs, ctrl) {
       	scope.publicate = function(parent){
            
            if(scope.publication.image==null){
                PublicationService.publicState(
                    AuthenticationService.getUserId(),
                    scope.publication
                ).then(function(data) {
                    console.log(data);
                    parent.getFeed();
                    scope.init();
                }).then(function(data) {
                    console.log(data);
                });
            }else{
                if(scope.publication.image!=null){
                    scope.publication.file=scope.publication.image;
                }
                PublicationService.publicFile(
                    AuthenticationService.getUserId(),
                    scope.publication
                ).then(function(data) {
                    if(data.errors==null){
                        console.log(data);
                        parent.getFeed();
                        scope.init();
                    }else{
                        console.log(data);
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