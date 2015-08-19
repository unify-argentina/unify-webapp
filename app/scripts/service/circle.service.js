
unifyApp.factory('CircleService', 	function($http, $resource, ENV) {

		var circle = $resource(ENV.apiEndPoint+'/api/user/:user_id/circle/:circle_id', {
			circle_id: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});

		var saveCircle = function(circle){
			 var promise = $http.post(ENV.apiEndPoint + '/api/user/' + circle.user_id + '/circle', 
				{
					user_id : circle.user_id,
					name : circle.name,
					parent_id : circle.parent,
					picture : circle.picture
				}
			).then(function(response) {	
        		return response.data;
			}, function(response) {
	        	console.log("ERROR: "+response.data ? response.data.message : response);
			});	
			return promise;
		};

		var updateCircle = function(circle){
			 var promise = $http.put(ENV.apiEndPoint + '/api/user/' + circle.user_id + '/circle/' + circle._id, 
				{
					user_id : circle.user_id,
					circle_id : circle._id,
					name : circle.name,
					parent_id : circle.parent,
					picture : circle.picture
				}
			).then(function(response) {	
        		return response.data;
			}, function(response) {
	        	console.log("ERROR: "+response.data ? response.data.message : response);
			});	
			return promise;
		};

		var getCircleTree = function(user_id, circle_id){
			 var promise = $http.get(ENV.apiEndPoint + '/api/user/'+user_id+'/circle/'+circle_id+'/tree')
			 .then(function(response) {	
        		return response.data;
			}, function(response) {
	        	console.log("ERROR: "+response.data ? response.data.message : response);
			});	
			return promise;
		};

		var getCircleFeed = function(user_id, circle_id){
			 var promise = $http.get(ENV.apiEndPoint + '/api/user/'+user_id+'/circle/'+circle_id+'/media')
			 .then(function(response) {	
        		return response.data;
			}, function(response) {
	        	console.log("ERROR: "+response.data ? response.data.message : response);
			});	
			return promise;
		};

	return{
		circle 			: circle,
		saveCircle		: saveCircle,
		updateCircle	: updateCircle,
		getCircleTree	: getCircleTree,
		getCircleFeed	: getCircleFeed
	}
});
