let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");


let submit = document.querySelector("#reset");

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

let dx = 0;
let dy = 0;

let gravity = 1;


let shotDeltaX, shotDeltaY, shotBool, shotAngle, normalizedDeltaX, normalizedDeltaY,
 shotHypoteneuse, shotSin, moveInterval, shotInfo, direction, magnitude, directionGuage, magnitudeGuage

let court = new Court(canvasWidth, canvasHeight);
let hoop = new Hoop(rimX, rimY, rimLength);
let backboard = new Backboard(backboardX, backboardY, backboardWidth, backboardHeight);
let ball = new Ball(ballX, ballY, ballRad, startAngle, endAngle);

let shotStart = new Shot(0,0);
let shotEnd = new Shot(0,0);

let shotStartBool = false;
let shotEndBool = false;


function renderCourt() {
    hoop.draw();
    backboard.draw();
    ball.draw();
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
    console.log("angle:  ", shotAngle, "hypotenuese: ", shotHypoteneuse);
    return([shotSin, shotHypoteneuse]);
}






canvas.addEventListener("mousedown", function() {
    shotStart.x = event.layerX;
    shotStart.y = event.layerY;
    shotStartBool = true;
});

canvas.addEventListener("mouseup", function(){
   
    if(shotStartBool) {
        shotInfo = shotMath();
        console.log(shotInfo)
        shotStartBool = false;
        shotBool = true;
        setVelocity(shotInfo)
        console.log(dx, dy)
        setInterval(moveBall, 10);
    }




function setVelocity(shotInfo) {
    direction = shotInfo[0];
    magnitude = shotInfo[1];

    console.log(shotInfo[0], shotInfo[1], direction);

    dx = 5;
    dy = -5;
    console.log(dx, dy)
    console.log(direction)


   if(direction < .1 && direction > -.1) {
        directionGuage= 0;
        console.log("center")
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
    console.log(dx, dy)

    console.log(dx, dy)
};

});





function moveBall(){
    if(shotBool) {
        shotBool = false;

}
    

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

   if(madeBasket()){
         console.log("bucket");
    }
    if(hitRim()) {
        if(dy < 0){
            dy= Math.abs(dy)
        }
        else {
            dy= 0-dy;
        }
    }
    ctx.clearRect(0,0, canvasWidth, canvasHeight);
    hoop.draw();
    backboard.draw();
    ball.x += dx;
    ball.y += dy;
    ball.draw();  


}   

function madeBasket() {
    return (ball.y <  hoop.y+10 && ball.y > hoop.y-10 && dy >= 0 && ball.x >= hoop.x +20 && ball.offsetX <= hoop.offsetX-20) 
};

function hitRim() {
    return ((ball.y <=  hoop.y+3 && dy >= 0 && ball.x >= hoop.x && ball.x <= hoop.x+10)
       || (ball.y <=  hoop.y+3 && dy >= 0 && ball.x >= hoop.offsetX - 10 && ball.x <= hoop.offsetX));
};



renderCourt();

submit.addEventListener("click", function(){
    console.log('reset')
    clearInterval(moveInterval);
    ctx.clearRect(0,0, canvasWidth, canvasHeight);
    ball.x = ballX;
    ball.y = ballY;
    renderCourt();  
})


