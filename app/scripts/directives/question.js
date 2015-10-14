unifyApp.directive('uwQuestion', function($rootScope, $timeout) {

	var link = function(scope, elm, attrs, ctrl) {
        scope.showTutorialText = function(){
            scope.showDescription=true; 
            $rootScope.hideQuestionMarks=true;
            $timeout(function() {
                scope.showDescription=false; 
                $rootScope.showQuestions=false;
            }, 10000);
        };

        $rootScope.$watch('showQuestions', function(newValue, oldValue) {
            if(newValue){
                $timeout(function() {
                    if(!$rootScope.hideQuestionMarks){
                        $rootScope.showQuestions=false;
                    }
                }, 6000);
               
            }
        });
    };

    return {
        restrict: 'E',
        link: link,
        templateUrl: 'views/question.html',
        scope:{
        	uwDescription: "="
        }
    };
});