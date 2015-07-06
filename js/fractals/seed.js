window.onload = function(){
//fraggles
	var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d'),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;

	var particles = [],
		numParticles = 5000,
		pCanvas = document.getElementById("particleCanvas"),
		pContext = pCanvas.getContext("2d"),
		imageData;


	init();

	function init() {

		// set the canvas smaller than full size
		canvas.width = 500;
		canvas.height = 500;

		// set the particle canvas to the same size
		pCanvas.width = width;
		pCanvas.height = height;

		// draw the seed
		context.fillRect(width / 2 - 2, height / 2 - 2, 4, 4);

		makeParticles();

		setInterval(update, 0);

		document.body.addEventListener("keyup", function(event) {
			console.log(event.keyCode);
			switch(event.keyCode) {
				case 80: // p
					popImage();
					break;

				default: 
					break;
			}
		});
	}

	function makeParticles() {
		for(var i = 0; i < numParticles; i += 1) {
			var p = {
				x: Math.random() * width, 
				y: Math.random() * height,
				vx: 0,
				vy: 0
			}
			particles.push(p);
		}
	}

	function update() {
		// grab the current pixels of the aggregate canvas
		imageData = context.getImageData(0, 0, width, height).data;

		// clear the particle canvas
		pContext.clearRect(0, 0, width, height);

		// update all particles
		for(var i = 0; i < numParticles; i += 1) {
			var p = particles[i];
			updateParticle(p);
		}
	}

	function updateParticle(p) {
		// check if this particle is hitting the aggregate (see text)
		var x = Math.round(p.x),
			y = Math.round(p.y),
			pixel = imageData[(y * width + x) * 4 + 3],
			hit = pixel > 0;

		if(hit) {
			// draw this particle on the aggregate and respawn it
			context.fillRect(p.x, p.y, 1, 1);
			respawn(p);
		}
		else {
			// randomize velocity a bit
			p.vx += Math.random() * .1 - .05;
			p.vy += Math.random() * .1 - .05;
			// update position
			p.x += p.vx;
			p.y += p.vy;
			// dampen motion
			p.vx *= .99;
			p.vy *= .99;

			// if offscreen, wrap around to the other side
			if(p.x > width) {
				p.x -= width;
			}
			else if(p.x < 0) {
				p.x += width;
			}
			if(p.y > height) {
				p.y -= height;
			}
			else if(p.y < 0) {
				p.y += height;
			}

			// draw current particle on particle canvas
			pContext.fillRect(p.x, p.y, 1, 1);
		}
	}

	function respawn(p) {
		// reset to a random position, either along top edge or left side
		if(Math.random() < .5) {
			p.x = Math.random() * width;
			p.y = 0;
		}
		else {
			p.x = 0;
			p.y = Math.random() * height;
		}
	}

	function popImage() {
	  var win = window.open("", "Canvas Image"),
	  	src = canvas.toDataURL("image/png");

	  win.document.write("<img src='" + src 
	  	+ "' width='" + width 
	  	+ "' height='" + height + "'/>");
	}

}
