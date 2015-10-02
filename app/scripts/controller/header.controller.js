

unifyApp.controller("HeaderController", function ($state) {
	
	var headerCtrl=this;

	headerCtrl.goToMain =function(){
		if($state.current.name=='main'){
			$state.reload();
		}else{
			$state.go('main');
		}
	}

	headerCtrl.goToMails =function(){
		if($state.current.name=='emails'){
			$state.reload();
		}else{
			$state.go('emails');
		}
	}
	
	var canvas = document.getElementById('myCanvas');
	var context = canvas.getContext('2d');

	// begin custom shape
	context.beginPath();
	context.moveTo(0, 0);
	context.bezierCurveTo(100, 80, 300, 80, 400, 0);

	// complete custom shape
	context.closePath();
	context.lineWidth = 5;
	context.fillStyle = '#579f9b';
	context.fill();
	//context.strokeStyle = '#579f9b';
	//context.stroke();
	context.save()

	
});