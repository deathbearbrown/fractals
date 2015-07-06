window.onload = function(){
//fraggles
	var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d'),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;

	var maxDepth = 0,
		numShapes = 3,
		angles = [
			Math.random() * Math.PI * 2,
			Math.random() * Math.PI * 2,
			Math.random() * Math.PI * 2
		],
		size = 0,
		dist = 0, 
		scaleFactor = .6,
		colors = [
			"rgba(200,10,100, 0.5)", "rgba(188,23,116, 0.5)", "rgba(176,37,131, 0.5)", "rgba(163,50,147, 0.5)", "rgba(151,63,162, 0.5)", "rgba(139,77,178, 0.5)", "rgba(127,90,193, 0.5)", "rgba(114,103,209, 0.5)", "rgba(102,117,224, 0.5)", "rgba(90,130,240, 0.5)",
			"rgba(90,130,240, 0.5)", "rgba(80,141,218, 0.5)", "rgba(70,152,196, 0.5)", "rgba(60,163,173, 0.5)", "rgba(50,174,151, 0.5)", "rgba(40,186,129, 0.5)", "rgba(30,197,107, 0.5)", "rgba(20,208,84, 0.5)", "rgba(10,219,62, 0.5)", "rgba(0,230,40, 0.5)"
		];

	init();

	function init() {

		size = height / 10;
		dist = [
			size * Math.random() * 3 + 1,
			size * Math.random() * 3 + 1,
			size * Math.random() * 3 + 1
		];

		draw();

		document.body.addEventListener("keyup", function(event) {
			console.log(event.keyCode);
			switch(event.keyCode) {
				case 32: // space
					maxDepth += 1;
					draw();
					break;

				case 80: // p
					popImage();
					break;

				default: 
					break;
			}
		});


	}

	function draw() {
		context.clearRect(0, 0, this.width, this.height);
		context.save();
		context.translate(width * 0.5, height * 0.5);
		drawShape();
		iterate(maxDepth);
		context.restore();		
	}

	function iterate(depth) {
		for(var i = 0; i < numShapes; i += 1) {
			context.save();
			context.rotate(angles[i]);
			context.translate(dist[i], 0);
			context.scale(scaleFactor, scaleFactor);
			drawShape();
			if(depth > 0) {
				iterate(depth - 1);
			}
			context.restore();
		}
	}

	function drawShape() {
		context.strokeStyle = colors[getRandomInt(0,20)];

		//circle
		// context.beginPath();
		// context.arc(0, 0, size, 0, Math.PI * 2, false);
		// context.fill();


				///// rect:
		// context.beginPath();
		// context.rect(-size, -size / 4, size * 2, size / 2);
		// context.fill();

		///// cross:
		context.beginPath();
		context.lineWidth = 3;
		context.moveTo(-size, -size);
		context.lineTo(size, size);
		context.moveTo(-size, size);
		context.lineTo(size, -size);
		context.stroke();

		///// random letter:
		// context.font = (size * 3) + "px Arial";
		// var letter = String.fromCharCode(65 + Math.floor(Math.random() * 26));
		// context.fillText(letter, 0, 0);

		///// word:
		// context.font = size + "px Arial";
		// context.fillText("fractal", 0, 0);
	}


	var popImage = function() {
	  var win = window.open("", "Canvas Image"),
	  	src = canvas.toDataURL("image/png");

	  win.document.write("<img src='" + src 
	  	+ "' width='" + width 
	  	+ "' height='" + height + "'/>");
	}

	function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
	}

}
