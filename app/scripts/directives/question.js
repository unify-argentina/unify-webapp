unifyApp.directive('uwQuestion', function($rootScope, $document, $timeout) {

	var link = function(scope, elm, attrs, ctrl) {
        scope.showTutorialText = function(){

            $rootScope.hideQuestionMarks=true;
            scope.showDescription=true; 
            timmer = $timeout(function() {
                scope.showDescription=false; 
                $rootScope.showQuestions=false;
                $document.unbind('click');
                $rootScope.$apply();
            }, 10000);
            $document.bind('click', function(event) {
                if(event.toElement.id!='questionMark'){
                    console.log(event);
                    scope.showDescription=false; 
                    $rootScope.showQuestions=false;
                    $document.unbind('click');
                    $timeout.cancel(timmer);
                    $rootScope.$apply();
                }
            });
            $rootScope.$apply();
        };

        $rootScope.$watch('showQuestions', function(newValue, oldValue) {
            if(newValue){
                $timeout(function() {
                    if(!$rootScope.hideQuestionMarks){
                        $rootScope.showQuestions=false;
                        $rootScope.$apply();
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