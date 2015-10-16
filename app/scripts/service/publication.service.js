
unifyApp.factory('PublicationService', function($http, $resource, Upload, $auth, ENV) {

	var publicState =  function(user_id,publication){
		 var promise = $http.post(ENV.apiEndPoint + '/api/user/' + user_id + '/media', 
			{
				user_id		: user_id,
				facebook	: publication.facebook,	
				twitter		: publication.twitter,
				text		: (publication.text!=null?publication.text:undefined),
				file 		: undefined
			}
		).then(function(response) {	
    		return response.data;
		}, function(response) {
			return response.data;
		});
		return promise;
	};

	var publicFile = function(user_id,publication){
		var promise = Upload.upload({
		        url: ENV.apiEndPoint + '/api/user/' + user_id + '/media', 
		        method: 'POST',
		 		file: publication.file,
		        data: {
				 	user_id		: user_id,
					facebook	: publication.facebook,	
					twitter		: publication.twitter,
					text		: (publication.text!=null?publication.text:undefined)
				}
		    }).then(function(response) {	
	    		return response.data;
			}, function(response) {
				return response.data;
			});
		return promise;
	};

	return{
		publicState : publicState,
		publicFile	: publicFile
	}
});