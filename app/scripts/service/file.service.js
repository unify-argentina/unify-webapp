
unifyApp.factory('FileService', function($http, $resource, Upload, $auth, ENV) {

	var saveFile = function(file){
    	console.log(file);
		var promise = $http.get(ENV.apiEndPoint + '/api/sign?file_type='+file.type)
		.then(function(response) {	
    		console.log(response.data);
    		//var token = localStorage.getItem('satellizer_token');
    		//localStorage.removeItem('satellizer_token');
    		//console.log(token);
    		Upload.upload({
		        url: response.data.signed_request, //S3 upload url including bucket name
		        method: 'POST',
		        skipAuthorization: true,
		        fields : {
		        	acl: 'public'
		        },
		        file: file,
		    });
    		//$auth.httpInterceptor = true;
		    return response.data;
		});
		return promise;
	};

	return{
		saveFile : saveFile
	}
});