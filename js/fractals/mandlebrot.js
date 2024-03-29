window.onload = function(){
//fraggles
	var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d'),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;

	var	currentX = 0, 
		imageData,
		stripWidth = 50,
		minR = -2,
		maxR = 1,
		minI = -1.2,
		maxI = 1.2,
		maxIter = 100,
		interval,
		newMinR, newMinI,
		dr, di,
		aspectRatio,
		zoomDiv,
		zoomX,
		zoomY,
		colors,
		colorA = [255, 196, 0],
		colorB = [0, 0, 0],
		numColors = 60;


	init();


	function randomRange(min, max){
		return min + Math.random()* (max-min);
	}

	function init() {
		initColors();
		zoomDiv = document.getElementById("zoom");
		aspectRatio = width / height;
		imageData = context.getImageData(0, 0, width, height);
		renderFull();

		document.body.addEventListener("keyup", function(event) {
			console.log(event.keyCode);
			switch(event.keyCode) {
				case 80: // p
					popImage();
					break;

				case 38: // up
					maxIter += 20;
					clearInterval(interval);
					renderFull();
					break;

				case 40: // down
					maxIter -= 20;
					clearInterval(interval);
					renderFull();
					break;

				case 67: // c
					clearInterval(interval);
					randomizeColors();
					renderFull();
					break;

				case 90: // z
					clearInterval(interval);
					numColors -= 2;
					numColors = Math.max(numColors, 2);
					initColors();
					renderFull();
					break;

				case 88: // x
					clearInterval(interval);
					numColors += 2;
					initColors();
					renderFull();
					break;

				case 71: // g
					clearInterval(interval);
					grayScale();
					renderFull();
					break;

				default: 
					break;
			}
		});

		document.body.addEventListener("mousedown", function(event) {
			clearInterval(interval);
			zoomX = event.clientX;
			zoomY = event.clientY;
			newMinR = minR + dr * zoomX;
			newMinI = minI + di * zoomY;
			zoomDiv.style.left = zoomX + "px";
			zoomDiv.style.top = zoomY + "px";
			document.body.addEventListener("mousemove", onMouseMove);
		});

		document.body.addEventListener("mouseup", function(event) {
			var x = event.clientX,
				y = event.clientY;
			document.body.removeEventListener("mousemove", onMouseMove);
			zoomDiv.style.width = "0px";
			zoomDiv.style.height = "0px";
			maxR = minR + dr * x;
			maxI = minI + di * y;
			if (maxR < newMinR || maxI < newMinI) {
				return;
			};
			minR = newMinR;
			minI = newMinI;
			console.log(minI, maxI, minR, maxR);
			currentX = 0;
			adjustWidth();
			renderFull();
		});

	}
	function onMouseMove(event) {
		zoomDiv.style.width = event.clientX - zoomX + "px";
		zoomDiv.style.height = event.clientY - zoomY + "px";
	}
	function renderFull() {
		currentX = 0;
		adjustWidth();
		dr = (maxR - minR) / width;	// one pixel's width on complex plane
		di = (maxI - minI) / height;	// one pixel's height on complex plane

		interval = setInterval(renderStrip, 0);
	}

	function adjustWidth() {
		var w = maxR - minR,		// width on complex plane
			h = maxI - minI,		// height on complex plane
			newW = h * aspectRatio,	// width with correct aspect ratio
			diff = newW - w;		// difference to equal new width

		minR -= diff / 2;			// add half difference to left
		maxR += diff / 2;			// and half to right
	}

	function randomizeColors() {
		colorA = [Math.random() * 255, Math.random() * 255, Math.random() * 255];
		colorB = [Math.random() * 32, Math.random() * 32, Math.random() * 32];
		initColors();
	}

	function grayScale() {
		colorA = [255, 255, 255];
		colorB = [0, 0, 0];
		initColors();
	}

	function initColors() {
		var redRange = colorB[0] - colorA[0],
			greenRange = colorB[1] - colorA[1],
			blueRange = colorB[2] - colorA[2];
			
		colors = [];
		for(i = 0; i < numColors; i += 1) {
			colors.push({
				red: colorA[0] + Math.floor(redRange / numColors * i),
				green: colorA[1] + Math.floor(greenRange / numColors * i),
				blue: colorA[2] + Math.floor(blueRange / numColors * i)
			})
		}
	}

	function renderStrip() {
		var x, y, h, color, index,
			w4 = width * 4,
			iData = imageData.data;
		
		// work across the strip horizontally
		for(x = currentX; x < currentX + stripWidth; x += 1) {
			index = x * 4;
			// render all the pixels in this vertical column
			for(y = 0, h = height; y < h; y += 1) {
				color = mandel(x, y);
				iData[index    ] = color.red;
				iData[index + 1] = color.green;
				iData[index + 2] = color.blue;
				iData[index + 3] = 255;
				index += w4;
			}
			if(x > width) {
				clearInterval(interval);
				break;
			}
		}
		context.putImageData(imageData, 0, 0, currentX, 0, stripWidth, height);
		currentX += stripWidth;
	}

	function mandel(x, y) {
		var cr = minR + x * dr,
			ci = minI + y * di,
			zr = 0,
			zi = 0,
			iter, zr1, zi1;

		for(iter = 0; iter < maxIter; iter += 1) {
			zr1 = zr * zr - zi * zi + cr;
			//zi1=Math.sin( 2 * zr * zi) + ci;
			zi1 = 2 * zr * zi + ci;
			zr = zr1;
			zi = zi1;
			if(zr * zr + zi * zi > 4) {
				return colors[iter % numColors];
			}
		}

		return {
			red: 0,
			green: 0,
			blue: 0
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
