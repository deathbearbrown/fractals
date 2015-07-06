window.onload = function(){
//fraggles
	var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d'),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;

	var table = [
			[ 0,     0, 	0,    0.16, 0, 0,    0.01],
	    [ 0.85,  0.04, -0.04, 0.85, 0, 1.6,  0.85],
	    [ 0.2,  -0.26,  0.23, 0.22, 0, 1.6,  0.07],
	    [-0.15,  0.28,  0.26, 0.24, 0, 0.44, 0.07]
	    ];

	var currentPoint,
		scale = 70,
		pointSize = 1 / scale,
		interval;


	init();

	function init() {

		context.translate(width / 2, height);
		context.scale(scale, -scale);

		currentPoint = {
			x: Math.random() * 2 - 1,
			y: Math.random() * 2 - 1
		};

		setPoint(currentPoint);

		document.body.addEventListener("keyup", function(event) {
			console.log(event.keyCode);
			switch(event.keyCode) {
				case 32: // space
					nextPoint();
					break;

				case 187: // +
					clearInterval(interval);
					interval = setInterval(function() {
						for(var i = 0; i < 10; i += 1) {
							nextPoint();
						}
					}, 0);
					break;

				case 189: // -
					clearInterval(interval);
					break;

				case 80: // p
					popImage();
					break;

				default: 
					break;
			}
		});
	}

	function nextPoint() {
		var t = getRandomTransform(),
			x = currentPoint.x * t[0] + currentPoint.y * t[1] + t[4];
			y = currentPoint.x * t[2] + currentPoint.y * t[3] + t[5];
		currentPoint.x = x;
		currentPoint.y = y;
		setPoint(currentPoint);
	}

	function getRandomTransform() {
		var randomNumber = Math.random();
		for(var i = 0; i < table.length; i += 1) {
			var row = table[i];
			if(randomNumber <= row[6]) {
				context.fillStyle = ["#070743", "#169D99", "#B9CC01","#FAE894", "#AB0768"][i];
				return row;
			}
			randomNumber -= row[6];
		}
}
function popImage() {
	  var win = window.open("", "Canvas Image"),
	  	src = canvas.toDataURL("image/png");

	  win.document.write("<img src='" + src 
	  	+ "' width='" + width 
	  	+ "' height='" + height + "'/>");
	}

	function setPoint(p) {
		context.beginPath();
		context.arc(p.x, p.y, pointSize, 0, Math.PI * 2, false);
		context.fill();
	}
}
