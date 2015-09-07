

unifyApp.controller("SignUpController",  function ($scope, $state, AuthenticationService) {
    
    $scope.signup = function() {
      AuthenticationService.signup($scope.user);
    };

  	var ocean = angular.element(".ocean"),
	    waveWidth = 10,
	    waveCount = Math.floor(window.innerWidth/waveWidth),
	    docFrag = document.createDocumentFragment();

	for(var i = 0; i < waveCount; i++){
	  var wave = document.createElement("div");
	  wave.className += " wave";
	  docFrag.appendChild(wave);
	  wave.style.left = i * waveWidth + "px";
	  wave.style.webkitAnimationDelay = (i/100) + "s";
	}
	
	ocean.append(docFrag);
});