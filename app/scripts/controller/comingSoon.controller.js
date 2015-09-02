unifyApp.controller("ComingSoonController", function ($scope,$interval,$document) {
 	var csctrl = this;

    csctrl.toTheTop = function() {
      $document.scrollTopAnimated(0, 1000).then(function() {
      });
    }
 	// make some waves.
	var ocean = angular.element("#ocean"),
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

	$interval(function() {
        csctrl.oneDay = 24*60*60*1000
	    csctrl.date1 = new Date();
	    csctrl.date2 = new Date('11/01/2015');

	    csctrl.difference = Math.abs((csctrl.date1.getTime() - csctrl.date2.getTime())/(csctrl.oneDay));
	   	csctrl.days = Math.trunc(csctrl.difference);

	  	csctrl.diffHours =(csctrl.difference-csctrl.days)*24;
	  	csctrl.hours = Math.trunc(csctrl.diffHours);

	  	csctrl.diffMinutes =(csctrl.diffHours-csctrl.hours)*60;
	  	csctrl.minutes = Math.trunc(csctrl.diffMinutes);

	  	csctrl.diffSeconds =(csctrl.diffMinutes-csctrl.minutes)*60;
	  	csctrl.seconds = Math.trunc(csctrl.diffSeconds);
          }, 1000);

	var canvas = document.getElementById('light');
	var ctx = canvas.getContext('2d');


	drawLight(ctx, canvas.width/2, canvas.width/2, canvas.height/2);


	function drawLight(ctx, side, cx, cy){
	    
	    var h = side * (Math.sqrt(3)/2);
	        
	    ctx.strokeStyle = "#fff";
	    
	    ctx.save();
	    ctx.translate(cx, cy);
	  
	    ctx.beginPath();
	        
	        ctx.moveTo(side, -h);
	        ctx.lineTo( -side, h / 2);
	        ctx.lineTo(side/2, h / 2);
	        ctx.lineTo(side, -h);
	        
	        ctx.fillStyle="white";
			ctx.fill();
	    
	        ctx.stroke();
	        
	    ctx.closePath();
	    ctx.save();

	}

});