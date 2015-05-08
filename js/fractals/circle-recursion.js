window.onload = function(){
//fraggles
	var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d'),
		width = canvas.width = 300,
		height = canvas.height = 300;
		context.translate(width/2,height/2);
		var p0 = {
			x:0,
			y:0
		};
		var colors = Gradient('#FF006F', '#37B3CC', 10);
		var number = 0;

		drawCircle(0,0,150);


		function drawCircle (x,y, radius){
			drawEllipse(x, y, radius);
			if (radius>30){
		    drawCircle(x + radius/2, y, radius/2);
		    drawCircle(x - radius/2, y, radius/2);
		    drawCircle(x, y + radius/2, radius/2);
		    drawCircle(x, y - radius/2, radius/2);
			}
		}


		function drawEllipse(x,y,radius){
      context.closePath();
      context.arc(x, y, radius, 0, 2 * Math.PI, false);
      context.lineWidth = 1;
      number = getRandomInt(0,9);
			context.strokeStyle=colors[number];
      context.stroke();
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
