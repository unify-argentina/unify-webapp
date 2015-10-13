unifyApp.directive('uwPublicInput', function(PublicationService, AuthenticationService) {
  	var link = function(scope, elm, attrs, ctrl) {
       	scope.publicate = function(){
            console.log(AuthenticationService.getUserId() +" - "+ scope.publication.toString());
            if(scope.publication.file==null){
                PublicationService.publicState(
                    AuthenticationService.getUserId(),
                    scope.publication
                ).then(function(data) {
                    console.log(data);
                    scope.init();
                });
            }else{
                PublicationService.publicFile(
                    AuthenticationService.getUserId(),
                    scope.publication
                ).then(function(data) {
                    console.log(data);
                    scope.init();
                });
            }
            
        };

        scope.init = function(){
            scope.publication = {};
            scope.publication.type='text';
            scope.publication.facebook=true;
            scope.publication.twitter=true;
        };

        scope.init();
    };
    return {
        restrict: 'E',
        link: link,
        templateUrl: 'views/publicInput.html'
    };
});