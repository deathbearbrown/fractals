
window.onload = function(){
	var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d'),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;

		/*

		Mad Circles

		find a point on a circle given an angle

			x = r * cos(A);
			y = r * sin(A);

		*/

		var centerX = width/2,
		centerY = height/2,
		radius = 200, 
		angle = 0,
		speed= .01,
		x, y;

		render();

		function render(){
			context.clearRect(0,0, width, height);
			x = centerX + Math.cos(angle)*radius;
			y = centerY + Math.sin(angle)*radius;

			context.beginPath();
			context.arc(x,y, 10, 0, Math.PI*2, false);
			context.fill();

			angle+=speed;
			requestAnimationFrame(render);
		}

};
