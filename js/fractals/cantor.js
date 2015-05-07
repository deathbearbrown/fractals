window.onload = function(){
//fraggles
	var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d'),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;

		

		var p0 ={
			x: 100,
			y: height * 0.75
		},
		p1 = {
			x: width - 100,
			y: height * 0.75 
		};
    var limit = 4;

		koch(p0,p1,limit);



		function koch(p0,p1, limit) {

      if (limit >0){

      	koch(p0,pA,limit-1);
      	koch(pA,pB,limit-1);
      	koch(pB,pC,limit-1);
      	koch(pC,p1,limit-1);

      } else {
				context.beginPath();
				context.moveTo(p0.x, p0.y);
				context.lineTo(pA.x, pA.y);

				context.lineTo(pB.x, pB.y);
				context.lineTo(pC.x, pC.y);
				context.lineTo(p1.x, p1.y);		

				context.stroke();
			}
		}

};
