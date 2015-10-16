unifyApp.factory('httpRequestInterceptor', function ($q, $location) {
    return {
        'responseError': function(rejection) {
            // do something on error
            console.log(rejection);
            if(rejection.status === 500){
                $location.path('/internalError');       
            }
            if(rejection.status === 404){
				$location.path('/notFound');          
            }
            if(rejection.status === -1){
				$location.path('/notFound');       
            }
            return $q.reject(rejection);
         }
     };
});