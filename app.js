let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");

let reset = document.querySelector("#reset");

let madeBucket = false;
let score = 0;

let width = window.innerWidth;
let height = window.innerWidth;

let canvasWidth = 600;
let canvasHeight = 600;

let rimX = 250;
let rimY = 170;
let rimLength = 100;

let backboardX = 150
let backboardY = 10;
let backboardWidth = 300;
let backboardHeight = 200;

let ballX = 300;
let ballY = 570;
let ballRad = 30;
let startAngle = 0;
let endAngle = Math.PI * 2;

let targetX = 255;
let targetY = 95;
let targetWidth = 90;
let targetHeight = 70;

let dx = 0;
let dy = 0;


let highScore = 0;



let gravity = -1;


let shotDeltaX, shotDeltaY, shotBool, shotAngle, normalizedDeltaX, normalizedDeltaY,
 shotHypoteneuse, shotSin, moveInterval, shotInfo, direction, magnitude, directionGuage, magnitudeGuage

let court = new Court(canvasWidth, canvasHeight);
let hoop = new Hoop(rimX, rimY, rimLength);
let backboard = new Backboard(backboardX, backboardY, backboardWidth, backboardHeight);
let ball = new Ball(ballX, ballY, ballRad, startAngle, endAngle);
let target = new Target(targetX, targetY, targetWidth, targetHeight);
let shotStart = new Shot(0,0);
let shotEnd = new Shot(0,0);

let shotStartBool = false;
let shotEndBool = false;

let hitTargetBool = false;
let scoreBool = false;

function renderCourt() {
    hoop.draw();
    backboard.draw();
    ball.draw();
    target.draw();
    drawScore();
}

function drawScore() {
    ctx.beginPath();
    ctx.font = "30px Arial";
    ctx.textAlign = "center";
    ctx.fillText(score, canvasWidth/2, canvasHeight/2);
    ctx.closePath();
}

function shotMath() {
    shotEnd.x = event.layerX;
    shotEnd.y = event.layerY;

    shotDeltaX = shotEnd.x - shotStart.x;
    shotDeltaY = shotEnd.y - shotStart.y;
    normalizedDeltaX = shotDeltaX + ball.offsetX;
    normalizedDeltaY = shotDeltaY +  ball.offsetY;

    shotHypoteneuse = Math.sqrt(Math.pow(shotDeltaX,2) + Math.pow(shotDeltaY,2))
    shotAngle = shotDeltaX/shotHypoteneuse
    shotSin = Math.sin(shotAngle);
    return([shotSin, shotHypoteneuse]);
}

canvas.addEventListener("mousedown", grab);
canvas.addEventListener("mouseup", release);
canvas.addEventListener("touchstart", grab);
canvas.addEventListener("touchend", release);

function grab() {
    shotStart.x = event.layerX;
    shotStart.y = event.layerY;
    if(shotStart.x >= ball.startX && shotStart.x <= ball.offsetX && shotStart.y >= ball.startY && shotStart.y <= ball.offsetY) {
        shotStartBool = true; 
    }
}

function release() {
    if(shotStartBool) {
        shotInfo = shotMath();
        shotStartBool = false;
        shotBool = true;
        setVelocity(shotInfo)
        setTimeout(clearCourt, 2000);
        moveInterval = setInterval(moveBall, 1);
    }  
}

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
    
    }
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
    ctx.clearRect(0,0, canvasWidth, canvasHeight);
    hoop.draw();
    backboard.draw();
    target.draw();
    drawScore();
    ball.x += dx;
    ball.y += dy;
    ball.draw();  
}   



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
}



renderCourt();
reset.addEventListener("click", clearCourt);


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