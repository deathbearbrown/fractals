window.onload = function(){
//fraggles
	var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d'),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;

		context.translate(width/2,height/2);

		var p0={
			x:0,
			y:-321
		},
		p1 = {
			x:278,
			y:160
		},
		p2 = {
			x:-278,
			y:160
		};

		var limit = 3;

		var colors = Gradient('#EDDE45', '#37B3CC', limit);

		//sierpinski triangle 

		sierpinski(p0,p1,p2, limit);

		function sierpinski(p0, p1, p2, limit){
			if (limit > 0){
				var pA = {
					x: (p0.x+p1.x)/2,
					y: (p0.y+p1.y)/2
				},
				pB = {
					x: (p1.x+p2.x)/2,
					y: (p1.y+p2.y)/2
				},
				pC = {
					x: (p2.x+p0.x)/2,
					y: (p2.y+p0.y)/2
				};

				sierpinski(p0, pA, pC, limit-1);
				sierpinski(pA, p1, pB, limit-1);
				sierpinski(pC, pB, p2, limit-1);
			} else {
				drawTriangle(p0,p1,p2);
			}
		}

		function drawTriangle(p0, p1, p2){
			context.fillStyle=colors[getRandomInt(0,5)];
			context.moveTo(p0.x, p0.y);
			context.lineTo(p1.x, p1.y);
			context.lineTo(p2.x, p2.y);
			context.fill();

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
	  return 'rgba('+obj.r+','+obj.g+','+obj.b+', 0.2)';
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
