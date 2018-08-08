
function angryBird()
{
	mycan.style.border="2px solid #202028"
	mycan.style.Align="center"
	var c=document.getElementById("mycan");
    var ctx=c.getContext('2d');
	var bx,by,x1,y1,degree,dist;
	var startTime;
	var xNew,yNew;
	var velX,velY;
	var t=0;
	var b=0;
	var totalTime=0;
	var birdArr=[];
	var img="bird.png";
	var imagebird=new Image();
    imagebird.src=img;
    var imageground=new Image();
    imageground.src="background.png";

	   c.addEventListener('mousedown',handledown)
	   c.addEventListener('mousemove', handleMove)
	   c.addEventListener('mouseup', handleUp)

	   c.addEventListener('touchstart',handledown)
	   c.addEventListener('touchmove', handleMove)
	   c.addEventListener('touchend', handleUp)
	 
   
	function draw(x,y)
	{
		//c.width=c.width;
	    drawBackground()
	    
		// ctx.beginPath();
		// ctx.fillStyle="#202028"
  //      ctx.arc(x,y,20,0,2*Math.PI);
  //      ctx.fill();
        ctx.drawImage(imagebird,x,y,40,40);


	}
	function drawBackground()
	{
		
		

		
	 ctx.drawImage(imageground,0,0,900,400);



        

        ctx.beginPath();
        ctx.fillStyle="orange";
		ctx.rect(880,200,10,80);
		 ctx.fillStyle="orange";
		ctx.rect(20,200,10,80)
		ctx.fill();
		ctx.closePath();

        ctx.beginPath();
		ctx.fillStyle="brown";
		ctx.rect(750,290,40,130)
		ctx.fill();
		ctx.closePath()

		// ctx.beginPath();
  //       ctx.moveTo(10,130);
  //       ctx.strokeStyle="green";
  //       ctx.lineWidth=5;
  //       ctx.lineTo(10,400);
  //       ctx.stroke();


  //       ctx.beginPath();
  //       ctx.moveTo(7,130);
  //       ctx.strokeStyle="green";
  //       ctx.lineWidth=5;
  //       ctx.lineTo(180,130);
  //       ctx.stroke();
	}
	function getMouse(e)
		{
			offsetX = c.offsetLeft;
                offsetY = c.offsetTop;
                var html = document.body.parentNode;
               this.htmlTop = html.offsetTop;
               this.htmlLeft = html.offsetLeft;
                
		         offsetX +=this.htmlLeft;
                offsetY +=this.htmlTop;
               var mx = e.clientX-offsetX;
		       var my = e.clientY-offsetY;

               return {x:mx,y:my}
		}
    this.birdLogic=function(_obj)
    {
    	bx=_obj.x;
	    by=_obj.y;
        birdArr.push({x:bx,y:by,img:img,id:1})
		birdArr.push({x:750,y:245,img:img,id:2})
    	draw(bx,by);
    	


    	

    }
    function handledown(evt)
    	{
    		  evt.preventDefault(); 

          var mouse=getMouse(evt);
        
		    	if(bx<=mouse.x&&bx+40>=mouse.x&&by<=mouse.y&&by+40>=mouse.y)
		    	{
		    		//console.log("abc")
		    		
		    		this.dragoffX=mouse.x-bx;
		    		this.dragoffY=mouse.y-by;
		    		
		    		this.dragging=true;
		    	}
    	}
    	function handleMove(evt)
    	{
    		var mouse=getMouse(evt);
    		if(this.dragging==true)
    		{
    			if((bx<=30&&by>=130&&by<=400)||(by<=140&&bx>=7&&bx<=180))
    			{

    				//||(by>=130&&by<=400&&bx>=200&&bx<=230)
    				bx=150;
    				by=245;
    				this.dragging=false;
    				draw(bx,by)
    				//c.removeEventListener('mouseup',handleUp)
    			}
    			else
    			{
    			bx=mouse.x-20;
    			by=mouse.y-20;
    			draw(bx,by)
    		    

    		    }
    		}
    	}
    	function handleUp(evt)
    	{
    		
    		if(this.dragging==true)
    		{
    		var mouse=getMouse(evt);
    		x1=mouse.x-20;
    		y1=mouse.y-20;
    		var a=getAngleDeg(x1,y1)
    		console.log(-a)
    		init(-a,x1,y1);
    		this.dragging=false;
    		}
    		
    		// x2=150-x1;
    		// y2=250;
    		// var time=new Date();
    		// var endTime=time.getSeconds()-startTime;
    		//console.log(endTime)
    		// var calc0=Math.pow(x2-150,2);
    		// var calc1=Math.pow(y2-250,2);
    		// var dis1=Math.sqrt(calc1+calc0)
    		// var calc2=Math.pow(y1-y2,2);
    		// var calc3=Math.pow(x2-x1,2);
    		// var dis2=Math.sqrt(calc3+calc2)
    		
    		

    	}
    	function getAngleDeg(x1,y1) {
        var angleRad = Math.atan2(225-y1,170-x1);
         var angleDeg = angleRad*180/Math.PI;
  
         return(angleDeg);
        }
        function getDistance(x0,y0,x1,y1)
        {
         
        var dx = x1 - x0;
        var dy = y1 - y0;
        return Math.sqrt(dx * dx + dy * dy);
    
        }
        function init(deg,x1,y1,time)
        {
         dist=getDistance(150,240,x1,y1);
         degree=deg;
         x1=x1;
         y1=y1;
         velX=dist*Math.cos(toRadians(degree));
         velY=dist*Math.sin(toRadians(degree));
         totalTime= (2 * velX *Math.sin(toRadians(degree))) / 9.8;
         requestAnimationFrame(moveBall);
        
         console.log(totalTime)

        }
        function toRadians (angle) {
        return angle * (Math.PI / 180);
        }

        function moveBall(time=0)
        {
        	t=t+0.2
        
        	
        	// xNew=x1+dist/100*Math.cos(degree)*t;
        	// yNew=(y1+dist/100*Math.sin(degree)*t-0.5*9.8*t*t);
        	// xNew=x1+(dist/100)*Math.cos(toRadians(degree))*t;
        	// yNew=y1+((dist/100)*Math.sin(toRadians(degree))*t-0.5*9.8*t*t);
        	xNew=x1+velX*t;
        	yNew=y1-(velY*t-(0.5*9.8*t*t));
        	draw(xNew,yNew);
        	//console.log(velX,velY)
         // if(yNew<=10)
         // {
         //  x1=xNew;
         //  y1=-yNew;

         // }
         // else
         // {
         // x1=xNew+4;
         //  y1=yNew;
         // }
          //console.log(xNew,yNew)
          if(yNew>307&&xNew>300)
          {
          	c.addEventListener('click',onClick);
          	ctx.font = "30px Arial";
          	ctx.fillStyle="red";
            ctx.fillText("Click To Play Again",300,150);

          	
          }
          else if(yNew>360)
          {
          	c.addEventListener('click',onClick);
          	ctx.font = "30px Arial";
          	ctx.fillStyle="red";
            ctx.fillText("Click To Play Again",300,150);

          }
          
          else if(xNew>=840&&xNew<=890&&yNew>=180&&yNew<=260)
          {
          	console.log("here")
          	c.addEventListener('click',onClick);
          	ctx.font = "30px Arial";
          	ctx.fillStyle="red";
            ctx.fillText("Won.Click To Play Again",300,150);

          }
          else
          {
          	setTimeout(function()
          	{
        	  requestAnimationFrame(moveBall);
            },totalTime);
          
          }
        }
        function onClick(evt)
        {
        	bx=150;
          	by=245;
          	draw(bx,by);
          	c.removeEventListener('click',onClick);
          	t=0;
          	xNew=0;
          	velX=0;
          	velY=0;
          	


        }
       // 
        
}







window.onload=function()
{
   var obj=new angryBird()
   	obj.birdLogic({
   	x:150,
   	y:245,
   	})

   	// obj.birdLogic({
   	// x:750,
   	// y:245
   	// })
   
}