

unifyApp.controller("LoginController", function ($scope, $auth, $window, $document, AuthenticationService) {
  	
  	var lgnCtrl = this;

	lgnCtrl.login = function() {
		AuthenticationService.login(lgnCtrl.user)
		.then(function(response) {
			lgnCtrl.errors=response.errors;
		});
	};

	lgnCtrl.authenticate = function(provider) {
		AuthenticationService.authenticate(provider)
		.then(function(response) {
			lgnCtrl.errors=response.errors;
		});
	};

	lgnCtrl.toTheTop = function() {
	  $document.scrollTopAnimated(0, 1000).then(function() {
	  });
	}
  	
  	lgnCtrl.signup = function() {
    	AuthenticationService.signup(lgnCtrl.newuser)
		.then(function(response) {
			lgnCtrl.errors=response.errors;
		});
    };

  	lgnCtrl.recoverPassword = function() {
  		console.log("1");
    	AuthenticationService.recoverPassword(lgnCtrl.user.email)
		.then(function(response) {
  			console.log("3");
  			if(!response.errors){
	  			lgnCtrl.isLogin=true; 
	  			lgnCtrl.isSignUp=false; 
	  			lgnCtrl.isRecover=false;
	  		}else{
				lgnCtrl.errors=response.errors;
	  		}
		});
    };

    lgnCtrl.isLogin=true; lgnCtrl.isSignUp=false;

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
	var w = angular.element($window);
    w.bind('resize', function () {
        $scope.$apply();
    });

    var $bubbles = angular.element('.bubbles');

	function bubbles() {
	  
	  // Settings
	  var min_bubble_count = 40, // Minimum number of bubbles
	      max_bubble_count = 80, // Maximum number of bubbles
	      min_bubble_size = 3, // Smallest possible bubble diameter (px)
	      max_bubble_size = 12; // Maximum bubble blur amount (px)
	  
	  // Calculate a random number of bubbles based on our min/max
	  var bubbleCount = min_bubble_count + Math.floor(Math.random() * (max_bubble_count + 1));
	  
	  // Create the bubbles
	  for (var i = 0; i < bubbleCount; i++) {
	    $bubbles.append('<div class="bubble-container"><div class="bubble"></div></div>');
	  }
	  
	  // Now randomise the various bubble elements
	  $bubbles.find('.bubble-container').each(function(){
		    // Randomise the bubble positions (0 - 100%)
		    var pos_rand = Math.floor(Math.random() * 101);
		    
		    // Randomise their size
		    var size_rand = min_bubble_size + Math.floor(Math.random() * (max_bubble_size + 1));
		    
		    // Randomise the time they start rising (0-10s)
		    var delay_rand = Math.floor(Math.random() * 11);
		    
		    // Randomise their speed (6-25s)
		    var speed_rand = 6 + Math.floor(Math.random() * 26);
		    
		    // Random blur
		    var blur_rand = Math.floor(Math.random() * 3);
		    
		    // Cache the this selector
		    var $this = $(this);
		    
		    // Apply the new styles
		    $this.css({
		      'left' : pos_rand + '%',
		      
		      '-webkit-animation-duration' : speed_rand + 's',
		      '-moz-animation-duration' : speed_rand + 's',
		      '-ms-animation-duration' : speed_rand + 's',
		      'animation-duration' : speed_rand + 's',
		      
		      '-webkit-animation-delay' : delay_rand + 's',
		      '-moz-animation-delay' : delay_rand + 's',
		      '-ms-animation-delay' : delay_rand + 's',
		      'animation-delay' : delay_rand + 's',
		      
		      '-webkit-filter' : 'blur(' + blur_rand  + 'px)',
		      '-moz-filter' : 'blur(' + blur_rand  + 'px)',
		      '-ms-filter' : 'blur(' + blur_rand  + 'px)',
		      'filter' : 'blur(' + blur_rand  + 'px)',
		    });
		    
		    $this.children('.bubble').css({
		      'width' : size_rand + 'px',
		      'height' : size_rand + 'px'
		    });
		    
		  });
		}

		// In case users value their laptop battery life
		// Allow them to turn the bubbles off
		$('.bubble-toggle').click(function(){
		  if($bubbles.is(':empty')) {
		    bubbles();
		    $bubbles.show();
		    $(this).text('Bubbles Off');
		  } else {
		    $bubbles.fadeOut(function(){
		      $(this).empty();
		    });
		    $(this).text('Bubbles On');
		  }
		  
		  return false;
		});

	bubbles();
});
