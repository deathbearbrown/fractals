window.onload = function(){
//fraggles
	var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d'),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;
	var points = [],
			offset = height/2,
			scaleFactor = .45;

	points.push({
		x: Math.random() * width,
		y: 0
	});

	points.push({
		x: Math.random() * width,
		y: height 
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
			for(var i = points.length - 1; i > 0; i -= 1) {
				var p0 = points[i],
					p1 = points[i - 1],
					newPoint = {
						x: (p0.x + p1.x) / 2,
						y: (p0.y + p1.y) / 2
					};

				newPoint.x += Math.random() * offset * 2 - offset;
				newPoint.y += Math.random() * offset * 2 - offset;
				points.splice(i, 0, newPoint);
			}

			offset *= scaleFactor;
		}

	function drawCoast() {
		context.fillStyle = "black";
		context.fillRect(0, 0, width, height);
		context.strokeStyle = "rgb(220, 200, 255)";
		context.lineWidth = 4;
		context.shadowColor = "rgb(255, 255, 255)";
		context.shadowOffsetX = 0;
		context.shadowOffsetY = 0;
		context.shadowBlur = 20;

		context.beginPath();
		context.moveTo(points[0].x, points[0].y);
		for(var i = 1; i < points.length; i += 1) {
			context.lineTo(points[i].x, points[i].y);
		}
		context.stroke();
	}


	}
