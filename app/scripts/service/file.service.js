
unifyApp.factory('FileService', function($http, $resource, Upload, $auth, ENV) {

	var saveFile = function(file){
		var promise = Upload.upload({
		        url: ENV.apiEndPoint + '/api/file', 
		        method: 'POST',
		        file: file
		    }).then(function(response) {
		    	return response.data;
		   	});
		return promise;
	};

	return{
		saveFile : saveFile
	}
});