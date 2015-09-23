
unifyApp.factory('FileService', function($http, $resource, Upload, ENV) {

	var saveFile = function(file){
    	console.log(file);
		var promise = $http.get(ENV.apiEndPoint + '/api/sign?file_type='+file.type)
		.then(function(response) {	
    		console.log(response.data);
    		Upload.upload({
		        url: response.data.signed_request, //S3 upload url including bucket name
		        method: 'POST',
		        fields : {
		        	acl: 'public'
		        },
		        file: file,
		    });
		    return response.data;
		});
		return promise;
	};

	return{
		saveFile : saveFile
	}
});