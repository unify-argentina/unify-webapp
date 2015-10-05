
unifyApp.factory('FileService', function($http, $resource, Upload, $auth, ENV) {

	var saveFile = function(file){
    	console.log(file);
		var promise = Upload.upload({
		        url: ENV.apiEndPoint + '/api/file', 
		        method: 'POST',
		        file: file
		    }).then(function(response) {
		    	console.log(response.data);	
		    	return response.data;
		   	});
		return promise;
	};

	return{
		saveFile : saveFile
	}
});