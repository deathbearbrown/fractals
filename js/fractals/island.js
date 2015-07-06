window.onload = function(){
//fraggles
	var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d'),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;
	var points = [],
			offset = height/6,
			scaleFactor = .5,
			initPoints =8,
			radius = height/3,
			angle=0;


		for(var i = 0; i < initPoints; i += 1) {
			angle = Math.PI * 2 / initPoints * i;
			points.push({
				x: Math.cos(angle) * radius,
				y: Math.sin(angle) * radius
			});
		}
		points.push(points[0]);

	drawCoast();

	document.body.addEventListener("keyup", function(event) {
			console.log(event.keyCode);
			switch(event.keyCode) {
				case 32: // space
					iterate();
					drawCoast();
					break;

				case 80: // p
					popImage();
					break;

				default: 
					break;
			}
		});

	var popImage = function() {
	  var win = window.open("", "Canvas Image"),
	  	src = canvas.toDataURL("image/png");

	  win.document.write("<img src='" + src 
	  	+ "' width='" + width 
	  	+ "' height='" + height + "'/>");
	}

	function iterate() {
			var newPoints = [];
			for(var i = 0; i < points.length - 1; i += 1) {
				var p0 = points[i],
					p1 = points[i + 1],
					newPoint = {
						x: (p0.x + p1.x) / 2,
						y: (p0.y + p1.y) / 2
					};

				newPoint.x += Math.random() * offset * 2 - offset;
				newPoint.y += Math.random() * offset * 2 - offset;
				newPoints.push(p0, newPoint);
			}
			newPoints.push(points[points.length - 1]);
			points = newPoints;
			offset *= scaleFactor;
		}

	function drawCoast() {
		//context.clearRect(0, 0, width, height);
		//context.lineWidth = 2;
		// context.beginPath();
		// context.moveTo(points[0].x, points[0].y);
		// for(var i = 1; i < points.length; i += 1) {
		// 	context.lineTo(points[i].x, points[i].y);
		// }
		// context.stroke();

	//ADD COLOR
	var gradient=context.createRadialGradient(100,100,700,100,100,0);
		gradient.addColorStop(0,"#242732");		
		gradient.addColorStop(1,"#09738A");

		context.fillStyle = gradient;
		context.fillRect(0, 0, width, height);
		context.save();

		context.translate(width/2, height/2);
		context.fillStyle = "#6E9183"; 
		context.strokeStyle="#EFE6C4";
		context.lineWidth = 2;
		context.beginPath(); 

		context.moveTo( points[ 0].x, points[ 0]. y); 
		for( var i = 1; i < points.length; i += 1) { 
			context.lineTo(points[i].x, points[i].y); 
		} 
		
		context.fill();
		context.stroke();
    context.restore();

	}


	}
