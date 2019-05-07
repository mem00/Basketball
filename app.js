let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");




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

let ballX = width/8;
let ballY = height - (height*.70);
let ballRad = width/40;
let startAngle = 0;
let endAngle = Math.PI * 2;

let dx = 10;
let dy = -10;


class Court {
    constructor(width, height) {  
        canvas.width = width;
        canvas.height = height;
        canvas.id = "court"
        canvas.context = canvas.getContext("2d");
        document.body.insertBefore(canvas, document.body.childNodes[0]);

    };
}

class Hoop {
    constructor(x, y, width) { 
        this.x = x;
        this.y = y;
        this.offsetX = x + width;
        this.offsetY = y + 3;
    }
    draw() {
        ctx.strokeStyle = "red";
        ctx.lineWidth = 3;
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.offsetX, this.y);
        ctx.stroke();
    };
}

class Backboard {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.offsetX = x + width;
        this.offsetY = y + height;
        this.width = width;
        this.height = height;
        }
        draw() {
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;
            ctx.strokeRect(this.x, this.y, this.width, this.height);
        }
}

class Ball {
    constructor(x, y, radius, startAngle, endAngle) {
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.startX = x - radius;
        this.startY = y - radius;

        this.offsetX = x + radius;
        this.offsetY = y + radius;
        this.dx = 0;
        this.dy = 0;
        this.startAngle = startAngle;
        this.endAngle = endAngle;
        }
        draw() { 
            ctx.fillStyle = "orange";
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle);
            ctx.closePath();
            ctx.fill();
        }

}

let court = new Court(canvasWidth, canvasHeight);
let hoop = new Hoop(rimX, rimY, rimLength);
let backboard = new Backboard(backboardX, backboardY, backboardWidth, backboardHeight);
let ball = new Ball(ballX, ballY, ballRad, startAngle, endAngle);



function renderCourt() {
    hoop.draw();
    backboard.draw();
    ball.draw();
}


canvas.addEventListener("click", function() {
    let eventX = event.layerX;
    let eventY = event.layerY; 

    let ballDirection = (ball.offsetX - ball.startX)/3;

    let left = ball.startX + ballDirection
    let straight = ball.startX + ballDirection*2;
    

       
    if((eventX >= ball.startX && eventX <= ball.offsetX) 
    && (eventY >= ball.startY && eventY <= ball.offsetY)) {
       
       if(eventX <= left){
           dx = -20;
       }
       if(eventX > left && eventX <= straight){
           dx = 0;     
       }
        setInterval(moveBall, 10);    
    };

});



function moveBall(){
    console.log(ball.offsetX, ball.offsetY, ball.startX, ball.startY, canvasWidth)
    console.log(event)
    if(ball.x >= canvasWidth) {
        dx =  0 - dx;
    }
    if(ball.y>= canvasWidth) {
        dy = 0 - dy;
    }
    if(ball.x <= 0) {
        dx = Math.abs(dx);
    }
    if(ball.y <= 0) {
       dy = Math.abs(dy);
    }
    ctx.clearRect(0,0, canvasWidth, canvasHeight);
    hoop.draw();
    backboard.draw();
    ball.x += dx;
    ball.y += dy;
    ball.draw();
}   



renderCourt();

