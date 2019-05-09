let width = window.innerWidth;
let height = window.innerWidth;

let canvasWidth = width/3;
let canvasHeight = width/3;

let rimX = width/8;
let rimY = height - (height * .9);;
let rimLength = width/14;

let backboardX = rimX - 100;
let backboardY = height - (height*.98);
let backboardWidth = width/5;
let backboardHeight = width/10;

let ballX = width/8 +10;
let ballY = height - (height*.70);
let ballRad = width/40;
let startAngle = 0;
let endAngle = Math.PI * 2;



    // console.log(event)
    // let eventX = event.layerX;
    // let eventY = event.layerY; 

    // let ballDirection = (ball.offsetX - ball.startX)/3;

    // let left = ball.startX + ballDirection;
    // let straight = ball.startX + ballDirection*2;
    

       
    // if((eventX >= ball.startX && eventX <= ball.offsetX) 
    // && (eventY >= ball.startY && eventY <= ball.offsetY)) {
       
    //    if(eventX <= left){
    //        dx = -20;
    //    }
    //    if(eventX > left && eventX <= straight){
    //        dx = 1;     
    //    }
    //      moveInterval = setInterval(moveBall, 10);    
    // };


    if (shotDeltaY >= 150){
        dy = -20;
    }
    else if (shotDeltaY >= 100){
        dy = -15;
    }
    else if (shotDeltaY >= 50){
        dy = -10;
    }
    else if (shotDeltaY >= 0){
        dy = -5;
    }
    else if (shotDeltaY >= -50){
        dy = 5;
    }
    else if (shotDeltaY >= -100){
        dy = 10;
    }
    else if (shotDeltaY >= -150){
        dy = 15;
    }
    else if (shotDeltaY >= -200){
        dy = 20;
    }
 

    if (shotDeltaX >= 150){
        dx = 20;
    }
    else if (shotDeltaX >= 100){
        dx = 15;
    }
    else if (shotDeltaX >= 50){
        dx = 10;
    }
    else if (shotDeltaX >= 0){
        dx = 5;
    }
    else if (shotDeltaX >= -50){
        dx = -5;
    }
    else if (shotDeltaX <= -100){
        dx = -10;
    }
    else if (shotDeltaX <= -150){
        dx = -15;
    }
    else if (shotDeltaX <= -200){
        dx = -20;
    }


    normalizedDeltaX = shotDeltaX + ball.offsetX;
    normalizedDeltaY = shotDeltaY +  ball.offsetY