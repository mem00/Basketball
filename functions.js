function renderCourt() {
    hoop.draw();
    backboard.draw();
    ball.draw();
    target.draw();
    drawScore();
};

function reRenderCourt() {
    ctx.clearRect(0,0, canvasWidth, canvasHeight);
    hoop.draw();
    backboard.draw();
    target.draw();
    drawScore();
    ball.x += dx;
    ball.y += dy;
    ball.draw();  

};

function clearCourt() {
    console.log('reset')
    clearInterval(moveInterval);
    ctx.clearRect(0,0, canvasWidth, canvasHeight);
    ball.x = ballX;
    ball.y = ballY;
    dx = 0;
    dy = 0;
    renderCourt();  
}

function drawScore() {
    ctx.beginPath();
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText(score, canvasWidth/2, canvasHeight/2);
    ctx.closePath();
};

function grab() {
    shotStart.x = event.layerX;
    shotStart.y = event.layerY;
    if(shotStart.x >= ball.startX && shotStart.x <= ball.offsetX && shotStart.y >= ball.startY && shotStart.y <= ball.offsetY) {
        shotStartBool = true; 
    };
};

function release() {
    if(shotStartBool) {
        shotInfo = shotMath();
        shotStartBool = false;
        shotBool = true;
        setVelocity(shotInfo)
        setTimeout(clearCourt, 2000);
        moveInterval = setInterval(moveBall, 1);
    };  
};

function shotMath() {
    shotEnd.x = event.layerX;
    shotEnd.y = event.layerY;

    shotDeltaX = shotEnd.x - shotStart.x;
    shotDeltaY = shotEnd.y - shotStart.y;

    shotHypoteneuse = Math.sqrt(Math.pow(shotDeltaX,2) + Math.pow(shotDeltaY,2))
    shotAngle = shotDeltaX/shotHypoteneuse;
    shotSin = Math.sin(shotAngle);
    return([shotSin, shotHypoteneuse]);
};

function setVelocity(shotInfo) {
    direction = shotInfo[0];
    magnitude = shotInfo[1];

    dx = 5;
    dy = -5;


    if(direction < .1 && direction > -.1) {
        directionGuage= 0;

    }
    else if(direction < 0) {
        directionGuage = 0-(1 + Math.abs(direction));
    }
    else{

        directionGuage = 1 +  Math.abs(direction);
    
    };
    dx = dx * directionGuage ;

    magnitudeGuage = magnitude/100;

    dx = dx * magnitudeGuage;
    dy = dy * magnitudeGuage;
};


function moveBall(){
    if(ball.x >= canvasWidth) {
        dx =  0 - dx;
    }
    else if(ball.y >= canvasWidth) {
        dy = 0 - dy; 
    }
    else if(ball.x <= 0) {
        dx = Math.abs(dx);
    }
   
    else if(ball.y <= 0) {
       dy = Math.abs(dy);
    }

    hitTarget();

    if(hitRim()) {
        if(dy < 0){
            dy= Math.abs(dy);
        }
        else {
            dy= 0-dy;
        }
    }

    else if(madeBasket()){
        console.log("bucket");
        score++;
        setTimeout(clearCourt, 500);
   }
   reRenderCourt();
};  

function madeBasket() {
    return (hitTargetBool && ball.y >= (hoop.y - ball.radius) && (ball.y < (hoop.y)) && 
    (dy >= 0) && (ball.startX > hoop.x + 10) && (ball.offsetX < hoop.offsetX-10)) 
};

function hitRim() {
    return ((ball.y <=  hoop.y+3 && dy >= 0 && ball.x >= hoop.x && ball.x <= hoop.x+10)
       || (ball.y <=  hoop.y+3 && dy >= 0 && ball.x >= hoop.offsetX - 10 && ball.x <= hoop.offsetX));
};

function hitTarget() {
    hitTargetBool = (ball.x >= target.x && ball.x < target.offsetX && ball.y > target.y && ball.y < target.offsetY && dy > 0);
    console.log(hitTargetBool)
};



