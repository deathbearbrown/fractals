window.onload = function(){
//fraggles
	var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d'),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;
	var points = [],
			numPoints = 3,
			r = .4,
			pointSize = 1,
			currentPoint,
			interval;

		init();

	function init() {

		var radius = height * .45,
			angle = 0;

		context.translate(width / 2, height / 2);

		for(var i = 0; i < numPoints; i += 1) {
			angle = Math.PI * 2 / numPoints * i;
			points.push({
				x: Math.cos(angle) * radius,
				y: Math.sin(angle) * radius
			});
			setPoint(points[i]);
		}

		currentPoint = {
			x: Math.random() * radius * 2 - radius,
			y: Math.random() * radius * 2 - radius
		}

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
		var randomPoint = getRandomPoint(),
			newPoint = {
				x: (currentPoint.x + randomPoint.x) * r,
				y: (currentPoint.y + randomPoint.y) * r
			};
		setPoint(newPoint);
		currentPoint = newPoint;
	}

	function getRandomPoint() {
		var index = Math.floor(Math.random() * numPoints);
		context.fillStyle = ["#070743", "#169D99", "#B9CC01","#FAE894", "#AB0768"][index];
		return points[index];
	}


	function setPoint(p) {
		context.beginPath();
		context.arc(p.x, p.y, pointSize, 0, Math.PI * 2, false);
		context.fill();
	}
}
