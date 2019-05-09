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

let dx = 10;
let dy = -10;

let gravity = 1;

console.log(canvasHeight)


let court = new Court(canvasWidth, canvasHeight);
let hoop = new Hoop(rimX, rimY, rimLength);
let backboard = new Backboard(backboardX, backboardY, backboardWidth, backboardHeight);
let ball = new Ball(ballX, ballY, ballRad, startAngle, endAngle);


console.log("ballX",ball.offsetX)
console.log("ballY", ball.offsetY)


let shotStart = new Shot(0,0);
let shotEnd = new Shot(0,0);

let shotStartBool = false;
let shotEndBool = false;


function renderCourt() {
    hoop.draw();
    backboard.draw();
    ball.draw();
}

let moveInterval;
canvas.addEventListener("mousedown", function() {
    console.log(event.layerX, event.layerY)
    shotStart.x = event.layerX;
    shotStart.y = event.layerY;
    shotStartBool = true;


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

});

let shotDeltaX, shotDeltaY, shotBool, shotTangent, normalizedDeltaX, normalizedDeltaY

canvas.addEventListener("mouseup", function(){
    shotEnd.x = event.layerX;
    shotEnd.y = event.layerY;
   
    if(shotStartBool) {
        shotDeltaX = shotEnd.x - shotStart.x;
        shotDeltaY = shotEnd.y - shotStart.y;
        normalizedDeltaX = shotDeltaX + ball.offsetX;
        normalizedDeltaY = shotDeltaY + ball.offsetY;


        shotTangent = normalizedDeltaY/normalizedDeltaX;
        shotInverseTangent = normalizedDeltaX/normalizedDeltaY;
        shotArcTan = Math.atan(shotTangent);

        console.log(event.layerX, event.layerY)
        console.log("normalized X", normalizedDeltaX, "normalizedDeltaY",normalizedDeltaY, "shotTangent", shotTangent, "shotInverseTangent", shotInverseTangent, "shot A tan", shotArcTan )
        shotStartBool = false;
        shotBool = true;
        // console.log("shotDeltaX: ", shotDeltaX, "  shotDeltaY: ", shotDeltaY, canvasWidth, canvasHeight);
        setInterval(moveBall, 10);

    }
});





function moveBall(){
    if(shotBool) {
        shotBool = false;
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
