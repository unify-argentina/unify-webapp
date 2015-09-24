
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
		        console.log("ERROR: "+response.data ? response.data.errors : response);
				return response.data;
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
	        	console.log("ERROR: "+response.data ? response.data.errors : response);
				return response.data;
			});
			return promise;
		};

		var getCircleTree = function(user_id, circle_id){
			 var promise = $http.get(ENV.apiEndPoint + '/api/user/'+user_id+'/circle/'+circle_id+'/tree')
			 .then(function(response) {	
        		return response.data;
			}, function(response) {
	        	console.log("ERROR: "+response.data ? response.data.errors : response);
				return response.data;
			});
			return promise;
		};

		var getCircleList = function(user_id, circle_id){
			 var promise = $http.get(ENV.apiEndPoint + '/api/user/'+user_id+'/circle/'+circle_id+'/tree')
			 .then(function(response) {	
			 	var list=[];
        		treeToList(response.data.tree[0], list, 0);
        		return list;
			});
			return promise;
		};

		var treeToList = function(tree, list, level){
			var group = {};
			group._id = tree._id;
			group.name = tree.name;
			group.level = level;
			list.push(group);
			if(tree.subcircles.length > 0){
				level++;
				_(tree.subcircles).forEach(function(subcircle) {
					treeToList(subcircle, list, level);
				}).value();	
			}
		};

		var getCircleFeed = function(user_id, circle_id){
			 var promise = $http.get(ENV.apiEndPoint + '/api/user/'+user_id+'/circle/'+circle_id+'/media')
			 .then(function(response) {	
        		return response.data;
			}, function(response) {
	        	console.log("ERROR: "+response.data ? response.data.errors : response);
				return response.data;
			});
			return promise;
		};

		

	return{
		circle 			: circle,
		saveCircle		: saveCircle,
		updateCircle	: updateCircle,
		getCircleTree	: getCircleTree,
		getCircleList	: getCircleList,
		getCircleFeed	: getCircleFeed
	}
});
