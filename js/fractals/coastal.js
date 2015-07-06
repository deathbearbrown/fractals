window.onload = function(){
//fraggles
	var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d'),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;
	var points = [],
			offset = height-(height/14),
			scaleFactor = .5;

		points.push({
			x: 0,
			y: height / 2
		});

		points.push({
			x: width,
			y: height / 2
		});

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
	var gradient=context.createLinearGradient(0,0,0,300);
		gradient.addColorStop(0,"#242732");		
		gradient.addColorStop(1,"#09738A");

		context.fillStyle = gradient;
		context.fillRect(0, 0, width, height);
		context.fillStyle = "#6E9183"; 
		context.strokeStyle="#EFE6C4";
		context.lineWidth = 2;
		context.beginPath(); 
		context.moveTo( points[ 0].x, points[ 0]. y); 
		for( var i = 1; i < points.length; i += 1) { 
			context.lineTo(points[i].x, points[i].y); 
		} 
		context.lineTo( width, height); 
		context.lineTo( 0, height); 
		context.fill();
		context.stroke();




	}


	}
