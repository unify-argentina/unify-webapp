unifyApp.directive('uwContactData', function() {

    return {
        restrict: 'E',
        templateUrl: 'views/contact.html',
        scope:{
        	uwContactId: "=",
        	uwCircleId: "=",
        	uwParentController: "="
        }
    };
});