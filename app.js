let canvas = document.createElement("canvas");
let ctx = canvas.getContext("2d");

let width = window.innerWidth;
let height = window.innerWidth;

let canvasWidth = width/3;
let canvasHeight = width/3;

let rimX = width/8;
let rimY = height - (height * .9);
let rimLength = width/14;

let backboardX = rimX - 100;
let backboardY = height - (height*.98);
let backboardWidth = width/5;
let backboardHeight = width/10;

let ballX = width/8;
let ballY = height - (height*.70);
let ballRad = width/40;



function renderCourt() {
    let court = new Court(canvasWidth, canvasHeight);
    let hoop = new Hoop(rimX, rimY, rimLength);
    let backboard = new Backboard(backboardX, backboardY, backboardWidth, backboardHeight);
    let ball = new Ball(ballX, ballY, ballRad);
    
}

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
            ctx.strokeStyle = "red";
            ctx.lineWidth = 3;
            ctx.moveTo(x, y);
            ctx.lineTo(x + width, y);
            ctx.stroke();
        }
}

class Backboard {
        constructor(x, y, width, height) {
            this.x = x;
            this.y = y;
            this.offsetX = x + width;
            this.offsetY = y + height;
            ctx.strokeStyle = "black";
            ctx.lineWidth = 1;
            ctx.strokeRect(x, y, width, height);
        }
    }

class Ball {
        constructor(x, y, radius) {
            this.x = x;
            this.y = y;
            this.offsetX = x + radius;
            this.offsetY = y + radius;
            ctx.fillStyle = "orange";
            ctx.beginPath();
            ctx.arc(x, y, radius, 0, Math.PI * 2);
            ctx.closePath();
            ctx.stroke();
            ctx.fill();
        }
    }


renderCourt();