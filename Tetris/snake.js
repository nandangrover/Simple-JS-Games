		var px=py=0
		var snake={x: 5, y:5};
		var ts=gs=20;
		var trail=[];
		var tail=5;
		var x=0;
		var y=0;
		document.speed=0;
		ax=ay=70;
		var context;
		var canvas;
		dir="right";
		var snakeSize=5;
		document.score=0;
		var obj;
		canvas=document.getElementById('snake');
		context=canvas.getContext('2d');
		window.onload=function() {


		//var framepersec=24;

		document.addEventListener('keydown',movement);
		speed();


	}
	function speed(){

		obj=setInterval(movesnake,1000/(32+document.speed));

		   // console.log(document.speed);


		}
		// let dropCounter=0;
		// var dropInterval=100;
		// let lastTime=0;


		function movesnake(){
			
		// 	const deltaTime=time-lastTime;
		// 	lastTime=time;
		//   dropCounter+=deltaTime;

		// console.log(dropCounter);
		//   if(dropCounter>dropInterval)
		// {
			
			//console.log("loop")
			checkCollision();
			x+=snake.x;
			y+=snake.y;


			if(dir=="left")
			{   

				snake.x = -1;
				snake.y=0;
			}
			else if(dir=="right")
			{
				snake.x = 1;
				snake.y=0;
			}
			else if(dir=="down")
			{
				snake.x=0;
				snake.y = 1;
			}
			else if (dir=="up")
			{
				snake.y = -1;
				snake.x=0;
			}

			context.fillStyle='#202028';
			context.fillRect(0,0,400,400);

			for(i=0;i<trail.length;i++)
			{
				context.fillStyle='white';
				context.fillRect(trail[i].x,trail[i].y,snakeSize,snakeSize);
				if(trail[i].x==x &&trail[i].y==y)
				{
					tail=5;
					document.score=0;
					document.getElementById('score').innerHTML=document.score;
		    	//console.log(document.score);
		    	//clearInterval(obj);
		    	alert("Game over")
		    }
		}
		trail.push({x:x ,y:y});

		while(trail.length>tail)
		{
			trail.shift();
		}


		if(ax>(x-5) && ax<(x+5)&& ay>(y-5) && ay<(y+5))
			{   document.score++;
				document.getElementById('score').innerHTML=document.score;
				tail+=5;


				ax=Math.floor((canvas.width-10)*Math.random());
				ay=Math.floor((canvas.height-10)*Math.random());
			//console.log(ax+"ax" +ay+"ay");

		}
		if(document.score>=5)
		{
			if((45<=ax&&ax<=50) &&(50<=ay&&ay<=100))
			{
				ax=Math.floor(canvas.width*Math.random());
				ay=Math.floor(canvas.height*Math.random());	
			}
			else if((245<=ax&&ax<=250) &&(50<=ay&&ay<=100))
			{
				ax=Math.floor(canvas.width*Math.random());
				ay=Math.floor(canvas.height*Math.random());	
			}
		}
		context.fillStyle='red';
		context.fillRect(ax,ay,5,5);
		if(document.score>=5)
		{
			renderObstacles();
		}
		if(document.score%5==0){
				//console.log(document.score)

				document.speed=2*document.score;
		      //console.log(document.speed);
		      clearInterval(obj);
		      speed();

		  }

		//if(x<0){
			//console.log(abc);
			//cancelAnimationFrame(movesnake);
		//}
		//dropCounter=0;
		// requestAnimationFrame(movesnake);


	}
		//requestAnimationFrame(movesnake);
		function renderObstacles()
		{
			context.beginPath();
			var gradient=context.createLinearGradient(0,0,170,0);
			gradient.addColorStop("0","magenta");


			context.beginPath();
			context.strokeStyle=gradient;
			context.moveTo(50,50);
			context.lineTo(50,100);
			context.lineWidth=5;
			context.stroke();
			context.beginPath();
			context.strokeStyle=gradient;
			context.moveTo(250,50);
			context.lineTo(250,100);
			context.lineWidth=5;
			context.stroke();

			if((45<=x&&x<=50) &&(50<=y&&y<=100))
			{
				tail=5;
				document.score=0;
				document.getElementById('score').innerHTML=document.score;
				alert("Game Over")
				x=0,y=0;
			}
			else if((245<=x&&x<=250) &&(50<=y&&y<=100)){

				tail=5;
				document.score=0;
				document.getElementById('score').innerHTML=document.score;
				alert("Game Over")
				x=0,y=0;
			}
		}
		function checkCollision(){
			

			if(document.score<5)
			{
				canvas.style.border="solid .2em #fff"
				if(x<0)
				{
					x=canvas.width;
				}
				else if(x>canvas.width)
				{
					x=1;
				}
				else if(y<0)
				{
					y=canvas.height;
				}
				else if(y>canvas.height)
				{
					y=1
				}
			}
			else if(document.score>=5)
			{
				canvas.style.border="solid .2em #FF0000	"
				if(x<0)
				{
		    	//console.log("idhar hu mei")
		    	tail=5;
		    	document.score=0;
		    	document.getElementById('score').innerHTML=document.score;
		    	alert("Game Over")
		    }
		    else if(x>canvas.width)
		    {
		    	tail=5;
		    	document.score=0;
		    	document.getElementById('score').innerHTML=document.score;
		    	alert("Game over")
		    }
		    else if(y<0)
		    {
		    	tail=5;
		    	document.score=0;
		    	document.getElementById('score').innerHTML=document.score;
		    	alert("Game over")
		    }
		    else if(y>canvas.height)
		    {
		    	tail=5;
		    	document.score=0;
		    	document.getElementById('score').innerHTML=document.score;
		    	alert("Game over")
		    }


		}

	}





	function movement(event){
			//console.table(trail);
			if(event.keyCode===37 &&dir!='right'){
				dir="left";
			}
			else if(event.keyCode===39&&dir!='left')
			{
				
				dir="right";
			}
			else if(event.keyCode===40&&dir!='up')
			{
				dir="down";

			}
			else if(event.keyCode===38&&dir!='down'){
				dir="up";
				
			}
		}


		// function pizza(x,y){
		//         context.fillStyle = 'yellow';
		//         context.fillRect(x*snakeSize, y*snakeSize, snakeSize, snakeSize);
		//         // This is the single square 
		//         context.fillStyle = 'red';
		//         context.fillRect(x*snakeSize+1, y*snakeSize+1, snakeSize-2, snakeSize-2);	
		// }
		// var x1=400*Math.random() |0;
		// var y1=400*Math.random() |0;
		// pizza(x1,y1);
		movesnake();


