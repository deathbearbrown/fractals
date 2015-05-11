/*
Right triangle.
Sides: adjacent, hypotenuse, opposite

sinA = o/h;
cosA = a/h;
tanA= o/a;

Cartesian coords (normal)- positive top and negative bottom
Angles ccw
units degrees

Computers - negative up top, positive on bottom
Angles cw
units: radians 
radian = 57.3 degrees

circle is 2PI r

degrees = (radians *180 )/ PI;

radians = (degrees*pi)/180;

*/


window.onload = function(){
	var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d'),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;

		// context.translate(0,height/2);
		// context.scale(1,-1);

		// for (var angle =0; angle < Math.PI *2; angle += .01){
		// 	var x = angle * 200,
		// 			y = Math.sin(angle)*200;
		// 	context.fillStyle ="#00cc00";
		// 	context.fillRect(x,y, 5, 5);


		// 	var x0 = angle * 200,
		// 			y0 = Math.cos(angle)*200;
		// 	context.fillStyle ="#cc0000";
		// 	context.fillRect(x0,y0, 5, 5);

		// 	// var x1 = angle * 200,
		// 	// 	y1 = Math.tan(angle)*200;
		// 	// context.fillStyle ="#0000cc";
		// 	// context.fillRect(x1,y1, 5, 5);
		// }

	var centerY = height * .5,
			centerX = width * .5,
			baseRadius = 100,
			offset = 50,
			speed = 0.1,
			angle = 0;

	render();

	function render(){
		var radius = baseRadius + Math.sin(angle) * offset;
		context.clearRect(0,0, width, height)
		context.beginPath();
		context.arc(centerX, centerY, radius, Math.PI*2, false);
		context.fill();
		angle += speed;
		requestAnimationFrame(render);
	}



};
