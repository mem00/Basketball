function renderCourt() {
   
    backboard.draw();
    hoop.draw();
    ball.x = ballX;
    ball.y = ballY;
    ball.startX = ball.x - ball.radius;
    ball.offsetX = ball.x + ball.radius;
    ball.startY = ball.y - ball.radius;
    ball.offsetY = ball.y + ball.radius;

    ball.draw();
    target.draw();
    drawScore();
    addListeners();
};

function reRenderCourt() {
    ctx.clearRect(0,0, canvasWidth, canvasHeight);
   
    hoop.draw();
  
    ball.x += dx;
    ball.y += dy;
    ball.startX = ball.x - ball.radius;
    ball.offsetX = ball.x + ball.radius;
    ball.startY = ball.y - ball.radius;
    ball.offsetY = ball.y + ball.radius;
    if(ball.startY < hoop.y && dy > 0) {
        ctx.globalCompositeOperation = "destination-over";
        ball.draw();  
    }
    else{
        ctx.globalCompositeOperation = "source-over";
        ball.draw();  
    }
    ctx.globalCompositeOperation = "destination-over";
    backboard.draw();
    target.draw();
    drawScore();
 
};

function addListeners(){
    canvas.addEventListener("mousedown", grab);
    canvas.addEventListener("mouseup", release);
    canvas.addEventListener("touchstart", grab);
    canvas.addEventListener("touchend", release);
    reset.addEventListener("click", clearCourt);
}

function clearCourt() {
    clearInterval(moveAnimation);
    ctx.clearRect(0,0, canvasWidth, canvasHeight);
    ball.x = ballX;
    ball.y = ballY;
    dx = 0;
    dy = 0;
    renderCourt();  
}

function drawScore() {
    ctx.beginPath();
    ctx.fillStyle = "black";
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
        setVelocity(shotInfo);
        moveAnimation = setInterval(moveBall, 10);
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

    dx = startDx;
    dy = startDy;

    if(!isNaN(direction) && !isNaN(magnitude)) {
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
}
else {
    dx = 0;
    dy = 2;
}

};


function moveBall(){
    if(ball.offsetX >= canvasWidth) {
        dx =  0 - dx;
    }
    if(ball.offsetY > canvasWidth) {
        dy = 0 - dy; 
    }
    if(ball.startX <= 0) {
        dx = Math.abs(dx);
    }
   
    if(ball.startY <= 0) {
       dy = Math.abs(dy);
    }

    if(hitRimLeft() || hitRimRight()) {
        dy= 0-dy;
     
    }

    else if(madeBasket()){
        score++;
        setTimeout(clearCourt, 500);
   }
   reRenderCourt();
};  

function madeBasket() {
   if(dy < 0)  return false;
   if(ball.x < hoop.x)  return false; 
   if(ball.x > hoop.offsetX)  return false;
   if(ball.startY <= hoop.y && ball.offsetY >= hoop.y) return true;
   else return false;
};

function hitRimLeft() {
   if(dy < 0) return false;
   let a = hoop.x - ball.x;
   if(a < 0) return false;
   let b = hoop.y  - ball.y;
   if(a < 0) return false;
   let c = Math.sqrt(Math.pow(a,2)+ Math.pow(b,2));
   if(c <= ball.radius) return true;
   else return false; 
};
function hitRimRight() {
   if(dy < 0) return false;
   let a = hoop.offsetX - ball.x;
   if(a < 0) return false;
   let b = hoop.y  - ball.y;
   if(a < 0) return false;
   let c = Math.sqrt(Math.pow(a,2)+ Math.pow(b,2));
   if(c <= ball.radius) return true;
   else return false; 
};




