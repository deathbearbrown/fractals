window.onload = function(){
//fraggles
	var canvas = document.getElementById('canvas'),
		context = canvas.getContext('2d'),
		width = canvas.width = window.innerWidth,
		height = canvas.height = window.innerHeight;

		var p0 = {
			x: width / 2,
			y: height - 50
		},
		p1 = {
			x: width / 2,
			y: 50
		},

		p2 = {
			x: width / 4,
			y: height - 50
		},
		p3 = {
			x: width / 4,
			y: 50
		},
		branchAngleA = randomRange(- Math.PI/2,Math.PI/2),
		branchAngleB = randomRange(- Math.PI/2,Math.PI/2),
		branchAngle = randomRange(0,Math.PI/2),
		trunkRatio = randomRange(0.25, 0.75),
		colors = ["rgb(87,179,33)", "rgb(86,158,32)", "rgb(86,138,31)", "rgb(85,117,30)", "rgb(85,97,30)", "rgb(84,76,29)", "rgb(84,56,28)", "rgb(83,35,27)"],
		limit = 8;

		function randomRange(min, max){
			return min + Math.random()* (max-min);
		}
		context.strokeStyle=colors[limit];
		context.lineWidth = limit*2;
		tree(p0, p1, 8);

		//tree(p2, p3, 8);


		function tree (p0, p1, limit){
			var dx = p1.x - p0.x,
					dy = p1.y - p0.y,
					dist = Math.sqrt(dx*dx+dy*dy),
					angle = Math.atan2(dy, dx),
					branchLength = dist* (1-trunkRatio),
					pA = {
						x: p0.x + dx * trunkRatio,
						y: p0.y + dy * trunkRatio
					},
					pB = {
						x: pA.x + Math.cos(angle + branchAngleA) * branchLength,
						y: pA.y + Math.sin(angle + branchAngleA) * branchLength
					},
					pC = {
						x: pA.x + Math.cos(angle + branchAngleB) * branchLength,
						y: pA.y + Math.sin(angle + branchAngleB) * branchLength
					};

			context.beginPath();
			context.strokeStyle=colors[limit-1];
			context.lineWidth = (limit-1) *2;
			context.moveTo(p0.x, p0.y);
			context.lineTo(pA.x, pA.y);
			context.stroke();
			context.closePath();

			if (limit > 0){
				tree(pA, pC, limit-1);
				tree(pA, pB, limit-1);
			} else {
				context.beginPath();
				context.moveTo(pB.x, pB.y);
				context.lineTo(pA.x, pA.y);
				context.lineTo(pC.x, pC.y);
				context.stroke();
			}

			//randomize more
			branchAngleA += randomRange(-0.02,0.02);
			branchAngleB += randomRange(-0.02,0.02);
			trunkRatio += randomRange(-0.02,0.02);
		}
}
