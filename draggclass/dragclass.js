	var c=document.getElementById("canvas");
	//var ctx=c.getContext('2d');
	function shape(ctx)
	{
	//console.log(ctx)

	this.draw=function(a,b,x,y,w,h,fillcolor)
	{
		//console.log(this.ctx)
		//ctx.strokeStyle=fillcolor;
		if(a==false)
		{
		ctx.fillStyle=fillcolor
		ctx.fillRect(x,y,w,h);
	}
		else if(a==true)
		{
		 ctx.strokeStyle=fillcolor;
         ctx.strokeWidth=b;
         ctx.strokeRect(x,y,w,h);
		}

	
	

	}
}

	
	function drop()
	{
		var offsetX=0;
		var offsetY=0;
		
		var ctx=c.getContext('2d');
		this.sel=null;
		this.dragoffX=0;
        this.dragoffY=0;
        this.dragging=false;
		var obj=new shape(ctx);
		var state=false;
		var counter=0;
		var counterx=0;
		function getMouse(e,shapes)
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
		function image(x,y)
		{
			 var imgData = ctx.getImageData(x,y , 1, 1);
             red = imgData.data[0];
             green = imgData.data[1];
             blue = imgData.data[2];
             //console.log("rgb("+red+","+green+","+blue+")")
             return("rgb("+red+","+green+","+blue+")");
		}
		this.move=function(shapes)
		{
			 this.temparr=[];
			
			c.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);
			 c.addEventListener('mousedown', function(e) {
			 	//console.log(c.offsetLeft)
			 	e.preventDefault();
		// 	
		    
                    


		    for(i=0;i<shapes.length;i++)
		    {

               var mouse=getMouse(e);
		    		
		    	//console.log(shapes[i].x)
		    	if(shapes[i].x<=mouse.x&&shapes[i].x+shapes[i].w>=mouse.x&&shapes[i].y<=mouse.y&&shapes[i].y+shapes[i].h>=mouse.y)
		    	{
		    		//console.log(shapes[i].selected)
		    		shapes[i].selected=true;
		    		counter++;
		    		//console.log(shapes[i].priority)
                   if(image(mouse.x,mouse.y)==shapes[i].color)
                     {
                       shapes[i].priority=shapes.length;

		    		this.dragoffX=mouse.x-shapes[i].x;
		    		this.dragoffY=mouse.y-shapes[i].y;
		    		this.dragging=true;
		    		//shapes[i].dragging=false;
		    		this.sel=shapes[i];
		    		this.temparr=shapes;
		    		

				let temp=0

		    		//console.log(this.temparr)
				for(i=0;i<this.temparr.length-1;i++)
				{
					for(j=0;j<this.temparr.length-i-1;j++)
					{
						if(this.temparr[i].priority>this.temparr[i+1].priority)
						{
							temp=this.temparr[i];
							this.temparr[i]=this.temparr[i+1];
							this.temparr[i+1]=temp;
							//console.log(this.temparr)
						}
					}
				}
				// let a=this.temparr.length-1;
    //             if(this.temparr[i].priority==shapes.length)
    //             {
				// obj.strokedraw(0,10,this.temparr[a].x-5,this.temparr[a].y-5,this.temparr[a].w+10,this.temparr[a].h+10);
			 //    }
			 //    else
			 //    {
			 //    	//console.log("abc")
			 //    	obj.strokedraw(0,0,shapes[i].x-5,shapes[i].y-5,shapes[i].w+10,shapes[i].h+10);
			 //    }
                    
		    	    
                   }
               }
                     
                   	
               
                  
		    	
		    }

		    	   		
		  
		    
		});
			 	
			 canvas.addEventListener('mousemove', function(e) {
			 	//console.log(this.state)
			 	var mouse=getMouse(e);
			 	if(this.dragging==true&&this.sel.selected==true){

			 	var mouse=getMouse(e);
			 	//console.log(this.sel.x,mouse.x,this.dragoffX)
			 	this.sel.x=mouse.x -this.dragoffX;
                this.sel.y=mouse.y -this.dragoffY;
                
                state=false;
                var selected=this.sel;
                //console.log(this.temparr)
               draw(selected,this.temparr);
            }
			 });
			 canvas.addEventListener('mouseup',function(e)
			 {
			 	for(i=0;i<shapes.length;i++)
		    {
		    	shapes[i].selected=false;
		    	shapes[i].priority--;
		    	//obj.strokedraw(0,0,shapes[i].x-5,shapes[i].y-5,shapes[i].w+10,shapes[i].h+10);

		    }
			 	this.dragging=false;
			 });

		}

		function clear()
		{
			ctx.clearRect(0,0,c.width,c.height);
		}
		function draw(sel,shapes1)
		{
			//console.log(this.state)
			if(state==false)
			{
				clear();

            //console.log("idhar")
				for(i=0;i<shapes1.length;i++)
				{
					//console.log(sel.id,shapes1[i].id)
					if(sel.id!=shapes1[i].id)
                     {
					 obj.draw(false,0,shapes1[i].x,shapes1[i].y,shapes1[i].w,shapes1[i].h,shapes1[i].color)
					}
				
			
			
				
				else
				{
			 obj.draw(false,0,shapes1[i].x,shapes1[i].y,shapes1[i].w,shapes1[i].h,shapes1[i].color)
			 ctx.strokeStyle="rgba(0,0,0,1)";
			 ctx.strokeWidth=10;
             ctx.strokeRect(sel.x-5,sel.y-5,sel.w+10,sel.h+10);
			 
			}
             }

               
               
               
           

               
          
                }
                state=true;

            }

            
            
          
            
			
		    
		
		
	}
	
	function drag()
	{

		var shapes=[];
		var id=0
		var ctx=c.getContext('2d');
		var obj1=new shape(ctx);
		var priority=5;

		this.addShape=function(a,b,x,y,w,h,color)
		{
			
			shapes.push({x:x,y:y,w:w,h:h,color:color,id:id,selected:false,priority:priority});

			id++;

			//console.log(shapes)
			obj1.draw(a,b,x,y,w,h,color);

			
		
		}
		var obj=new drop();
		obj.move(shapes);
	}
		
	function init()
	{
		var obj=new drag();
		obj.addShape(false,0,20,20,100,100,"rgb(255,0,0)")
		//obj.addShape(130,20,120,100,"skyBlue")
		obj.addShape(false,0,200,20,100,100,"rgb(0,0,0)")
		obj.addShape(false,0,200,50,100,100,"rgb(0,0,255)");
		obj.addShape(false,0,200,50,100,100,"rgb(0,100,155)");
		obj.addShape(false,0,200,50,100,100,"rgb(55,100,100)");
		//obj.addShape(true,10,200,100,100,100,"rgb(55,100,100)");

	}