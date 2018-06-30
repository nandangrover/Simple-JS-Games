var bY=50;
var bX=80;

plen=200;

var py=40;
var px=0;
var pipe=[];
var c=document.getElementById('mycanvas');
var ctx=c.getContext('2d');
pipe[0]={
	x:mycanvas.width,
	y:2,
	constant:50,
}
 var req=false;
 var press=false;
 var fallingConstant=200;
 var vertSpeed=0;
 var jumpSpeed=5;
 var lasttime=0;

function draw(time=0)
{

var imagebg=new Image();
imagebg.src="bg.png";
var imagebird=new Image();
imagebird.src="bird.png";
var imageground=new Image();
imageground.src="ground.png";
var imagetop=new Image();
imagetop.src="tubetop.png";
var imagebtm=new Image();
imagebtm.src="tubebottom.png";
//console.log(image);

ctx.drawImage(imagebg,0,0,mycanvas.width,mycanvas.height);
ctx.drawImage(imagebird,bX,bY,40,40);
ctx.drawImage(imageground,0,mycanvas.height-40,mycanvas.width,100);


for(i=0;i<pipe.length;i++)
{

if(collision())
{
	display();
}
ctx.drawImage(imagetop,pipe[i].x,pipe[i].y-pipe[i].constant,60,plen);
ctx.drawImage(imagebtm,pipe[i].x,pipe[i].y+200+pipe[i].constant,60,plen);
pipe[i].x--;

//console.log(pipe[i].x,pipe[i].y)

if(pipe[i].x==mycanvas.width-190)
{
	pipe.push(
		{x:mycanvas.width, 
		y:Math.floor(Math.random()*130),
		constant:Math.floor(Math.random()*21 +30)
		});
	//console.log(pipe[i])
}
}

const deltatime=(time-lasttime)/1000;
lasttime=time;
//console.log(time);

	bY -= vertSpeed * deltatime;
     vertSpeed -= fallingConstant *deltatime ;
     //console.log(vertSpeed)

document.addEventListener("keypress",movement,false);
if(req==false){
requestAnimationFrame(draw);
}
}


function movement(evt){
   vertSpeed = jumpSpeed;
   //console.log(vertSpeed+"movement")
   press=true;
	if(evt.keyCode==32)
	{
		bY-=20;
	}

}
function collision()

{
	//console.log(bX,bY)
	//console.table(pipe)
	
if((bX+30>=pipe[i].x&&bX+40<=pipe[i].x+70)&&(bY<=pipe[i].y+200-pipe[i].constant||bY+40>=pipe[i].y+200+pipe[i].constant)||bY+40>=mycanvas.height-40)
	{
		return true;
	}
	return false;
}
function display()
{
	var a=pipe.length;
	a=a-3;
	if(a<0)
	{
		a=0;
	}
	//console.log(a-3)
	req=true;
	ctx.font = "50px Arial";
	ctx.textAlign="center";
 ctx.fillText("Game Over",mycanvas.width/2,(mycanvas.height/2)+20);
 ctx.fillText("Score "+a,mycanvas.width/2,(mycanvas.height/2)+70);
}

draw();
