class Court {
    constructor(width, height) {  
        canvas.width = width;
        canvas.height = height;
        canvas.id = "court"
        canvas.context = canvas.getContext("2d");
        document.body.appendChild(canvas);
    }
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
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.offsetX, this.y);
        ctx.stroke();
        ctx.closePath();
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
            ctx.beginPath();
            ctx.strokeStyle = "white";
   
            ctx.lineWidth = 1;
        
            ctx.strokeRect(this.x, this.y, this.width, this.height);
            ctx.closePath();
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

class Shot {
    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}

 class Target {
     constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.offsetX = x + width;
        this.offsetY = y + height;
        this.width = width;
        this.height = height;
    }
    draw() {
        ctx.beginPath();
        ctx.strokeStyle = "white";
        ctx.fillStyle = "black";
        ctx.lineWidth = 2;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.closePath();
    }
 }