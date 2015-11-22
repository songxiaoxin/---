window.onload=function(){
//贪吃蛇开始---------------------------------------------
    var changjing=document.getElementById('changjing'),row=10,width=(800-row)/row+'px';
    for(var i=0;i<row;i++){
        for(var j=0;j<row;j++){
            var block=document.createElement('div');
            block.setAttribute('id','block');
            block.setAttribute('class',i+'_'+j);
            block.style.width=width;
            block.style.height=width;
            changjing.appendChild(block);
        }
    }

    var snake=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
    var RIGHT =39,LEFT =37,UP =38,DOWN =40;
    var defaultDirection=RIGHT;
    var isInSnake=function(x,y){
        for(var i=0;i<snake.length;i++){
            if(snake[i].x==x&&snake[i].y==y){
                return true;
            }
            }
        return false;
        };
    var  dropFood=function(){
        var x=Math.floor(Math.random()*10);
        var y=Math.floor(Math.random()*10);
        if(snake.length==100){
            alert('你已经超越神了');
            return;
        }
        while(isInSnake(x,y)){
         x=Math.floor(Math.random()*10);
         y=Math.floor(Math.random()*10);
        }
        document.getElementsByClassName(x+'_'+y)[0].style.background='deeppink';
        return{foodx:x,foody:y}
    } ;
    var drawSnake=function(){
        for(var i=0;i<snake.length;i++){
            document.getElementsByClassName(snake[i].x+'_'+snake[i].y)[0].style.background='yellow'
        }
    };
    drawSnake();
   var food=dropFood();

 var   zou=function(){
        var Last=snake.length-1;
        var Newhead;
        if(defaultDirection==RIGHT){
            Newhead={x:snake[Last].x,y:snake[Last].y+1};
        }
        if(defaultDirection==LEFT){
            Newhead={x:snake[Last].x,y:snake[Last].y-1};
        }
        if(defaultDirection==UP){
            Newhead={x:snake[Last].x-1,y:snake[Last].y};
        }
        if(defaultDirection==DOWN){
            Newhead={x:snake[Last].x+1,y:snake[Last].y};
        }

        if(Newhead.x<0||Newhead.y<0||Newhead.x>9||Newhead.y>9){
             alert('你撞到墙了');clearInterval(t);location.reload(); return;
        }
        if(isInSnake(Newhead.x,Newhead.y)){
            alert('咬住自己了');clearInterval(t);location.reload();return;
        }
        if(Newhead.x==food.foodx&&Newhead.y==food.foody){
            snake.push(Newhead);
            var tmp=document.getElementsByClassName(food.foodx+'_'+food.foody);
            tmp[0].style.background='yellow';food=dropFood();
            return;
        }

        snake.push(Newhead);
        var weiba=snake.shift();
        document.getElementsByClassName(weiba.x+'_'+weiba.y)[0].style.background='none';
        document.getElementsByClassName(Newhead.x+'_'+Newhead.y)[0].style.background='yellow';
}
   document.onkeydown=function(e){
        var d= e.keyCode;
        if(d==LEFT||d==RIGHT||d==UP||d==DOWN){
            if(Math.abs(d-defaultDirection)!==2){
                defaultDirection=d;
            }
        }
       if (e.preventDefault )
           e.preventDefault(); //阻止默认浏览器动作(W3C)
       else
           e.returnValue = false;
};

 var    flageee=true,t;
    changjing.onclick=function(){

     if(flageee){
          t= setInterval(zou,240);
     }
       flageee=false;
    };
//贪吃蛇结束--------------------------------------


    //界面
    var start=document.getElementsByClassName('start');
    var ren=document.getElementById('ren');
    start[0].onclick=function(){
        animate(ren,{top:-400},800);
        setTimeout(function(){
            jiemian.style.display='none';
        },800)
    };

};