unifyApp.directive('uwMessage', function($timeout) {
    
    var link = function(scope, elm, attrs, ctrl) {

        scope.$watch('ngModel', function(newValue, oldValue) {

            scope.danger = (typeof attrs.danger !== 'undefined');
            scope.warning = (typeof attrs.warning !== 'undefined');
            scope.info = (typeof attrs.info !== 'undefined');
            scope.success = (typeof attrs.success !== 'undefined');

            if (newValue) {
                $timeout(function () {
                    scope.showMessage = true;
                }, 500);

                $timeout(function () {
                    scope.showMessage = false;
                    scope.ngModel = '';
                }, 5000);
            }

        });

    };

    return {
        restrict: 'EA',
        link: link,
        templateUrl: 'views/message.html',
        scope: {
            ngModel: '='
        }
    };    
});