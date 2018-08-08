
var canvasd;
var ctx;
var image1;
var image2;
var images=[];
var x1;
var y1;
var x=40;
var y=40;
var startx;
var starty;
var counter=0;
var dragok=false;
var counterS=0;
var expandc=false;
 
 	image1=new Image();
  image1.src="image1.jpg";
 image2=new Image();
  image2.src="image2.jpg";

canvasd=document.createElement("canvas");
 ctx=canvasd.getContext('2d');
function draw()
{
	 canvasd.setAttribute("width","1200");
 canvasd.setAttribute("height","700");
 canvasd.style.border="1px solid black";
 canvasd.style.position="absolute";
 canvasd.style.left="0px";
 canvasd.style.top="0px";
 ctx.fillStyle="black";

 
 document.body.appendChild(canvasd);
 init();

  
  
   
 

}
function init()
{
	clearRect();
	
	for(i=0;i<images.length;i++)
	{
	drawImage(images[i].image,images[i].x,images[i].y,images[i].w,images[i].h);
    }

	
}
function clearRect()
{
	ctx.clearRect(0,0,1200,700);
}
function drawImage(image,x,y,w,h)
{ 
	ctx.fillStyle="white";
	ctx.lineWidth=1;
	// ctx.shadowColor=null;
	// ctx.shadowBlur=null;
	ctx.strokeRect(220,40,900,500);

	//console.log(image,x,y,w,h)

  ctx.drawImage(image,x,y,w,h);
  
}
 // console.log(image1)


function myDown(e)
{
	//console.log(canvasd.offsetLeft,e.clientX)
	if(expandc==false)
	{
	clone(e);
     }
	for(i=0;i<images.length;i++)
	{
		var counter=0;
		var r=images[i];
	if(e.clientX<r.x+100&&e.clientX>r.x &&e.clientY>r.y &&e.clientY<r.y+100)
	{
		
		e.preventDefault();
		e.stopPropagation();
		 startx=e.clientX;
		 starty=e.clientY;
		 r.isDraggable=true;
		 if(counterS==0&&r.isDraggable==true)
		 {
             ctx.shadowBlur=20;
             ctx.shadowColor='black';
             counterS++;
         }


         //console.log(startx,starty)
         
		dragok=true;

		canvasd.onmousemove=myMove;
		
		//console.log("yoo")
	}
	
	
       
	 // var image=r.image;
		//  images.push({image:image,x:r.x,y:r.y,w:100,h:100});
}
}
function clone(e)
{
	for(i=0;i<images.length;i++)
	{
		
		var r=images[i];
	if(e.clientX<r.x+100&&e.clientX>r.x &&e.clientY>r.y &&e.clientY<r.y+100&&counter==0)
	{
        
		var image=images[i].image;
	 
	 images.push({image:image,x:r.x-50,y:r.y+50,w:100,h:100,isDraggable:false});
	 ctx.drawImage(image,r.x-50,r.y+50,100,100);
	 console.log(images)
	 counter++;
	 console.log(r.x,r.y)
	}
}
}
function myMove(e)
{
	e.preventDefault();
	e.stopPropagation();
if(dragok)
{



	 x1 = e.clientX-50;
     y1 = e.clientY-50;
     //console.log(x1,y1)
     for(var i=0;i<images.length;i++)
        {
                	 

        	if(images[i].isDraggable)
        	{
            images[i].x=x1;
            images[i].y=y1;
            }
        }

init();
}
}
function myUp()
{
	counter=0;
     counterS=0;
           ctx.shadowBlur=null;
           ctx.shadowColor=null;
         
dragok=false;


for(var i=0;i<images.length;i++)
        {
            images[i].isDraggable=false;
            if(images[i].x>=220&&images[i].x<=1020&&images[i].y>=40&&images[i].y<=540)
            {
              
                 expandc=true;
             expand(images[i]);
            }
        }

}
function expand(images1)
	{

	            //ctx.clearRect(220,40,900,500)
                var image=images1.image;
               
                
            	ctx.drawImage(image,220,40,900,500);
            	images.isDraggable=false;
            }

window.onload=function()
{

images.push({image:image1,x:x,y:y,w:100,h:100,isDraggable:false});
images.push({image:image2,x:x,y:y+110,w:100,h:100, isDraggable:false});
	

draw();


}
canvasd.onmousedown=myDown;
canvasd.onmouseup=myUp;
