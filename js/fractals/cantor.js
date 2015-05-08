window.onload = function(){
//fraggles
	var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d'),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;

		var p0 = {
			x:100,
			y:100
		},
		width= 700;
		// var colors = [
		// "#00CC00",
		// "#ACE600",
		// "#8800CC",
		// "#FFFF00",
		// "#0099CC",
		// "#FF006F",
		// "#FFB300",
		// "#169D99"
		// ];
		var colors = Gradient('#FF006F', '#37B3CC', 10);
		var number = 0;

		cantor(p0,width,40);

		function cantor(p0, width, height){
			if (width > 5){

				drawRectangle(p0, width, height);
				var pN = {
					x: p0.x,
					y: p0.y+100
				},
				pA = {
					x: p0.x+(width*2)/3,
					y: p0.y+100
				},
				nWidth = width/3;

				cantor(pN,nWidth,height);
				cantor(pA,nWidth,height);
			}
		};

		function drawRectangle (p, width, height){
			context.closePath();
			number = getRandomInt(0,9);
			context.fillStyle=colors[number];
			context.moveTo(p.x, p.y);
			context.lineTo(p.x+width, p.y);
			context.lineTo(p.x+width, p.y-height);
			context.lineTo(p.x, p.y-height);
			context.lineTo(p.x, p.y);
			context.fill();
			context.beginPath();
		}
	


	function getRandomInt(min, max) {
	  return Math.floor(Math.random() * (max - min)) + min;
	}
	//colors
	function _componentToHex(c) {
	    var hex = c.toString(16);
	    return hex.length == 1 ? "0" + hex : hex;
	}

	function _rgbToHex(obj) {
	    return "#" + _componentToHex(obj.r) + _componentToHex(obj.g) + _componentToHex(obj.b);
	}

	function _hexToRgbObj(hex) {
	  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
	  return result ? {
	      r: parseInt(result[1], 16),
	      g: parseInt(result[2], 16),
	      b: parseInt(result[3], 16)
	  } : null;
	}

	function _convertObjToRGB (obj){
	  return 'rgb('+obj.r+','+obj.g+','+obj.b+')';
	}

  function _convertRGBtoObj (color){
    var digits = color.match(/^rgba?[\s+]?\([\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?,[\s+]?(\d+)[\s+]?/i);
    return {
      r: parseInt(digits[1]),
      g: parseInt(digits[2]),
      b: parseInt(digits[3])
    };
  }


  function Gradient (color1, color2, steps){
    var rgb1 = _hexToRgbObj(color1);
    var rgb2 = _hexToRgbObj(color2);
    var i, colorArray = new Array(steps);
    var n = steps || 5;
    n--;
    if (steps == 1){
      return [];
    }
    for(i=n; i>=0; i--){
      colorArray[i]= _convertObjToRGB ({
        r:Math.round((i*rgb2.r+(n-i)*rgb1.r)/n),
        g:Math.round((i*rgb2.g+(n-i)*rgb1.g)/n),
        b:Math.round((i*rgb2.b+(n-i)*rgb1.b)/n)
      });
    }
    return colorArray;
  }
};
