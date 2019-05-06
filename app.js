let canvas = document.createElement("canvas");

function playGame() {
    let court = new Court;
    court.start();
    court.hoop();
    court.backboard();
    court.ball();
}

class Court {
        start() {  
            canvas.width = window.innerWidth / 2;
            canvas.height = window.innerHeight / 2;
            canvas.id = "court"
            canvas.context = canvas.getContext("2d");
            document.body.insertBefore(canvas, document.body.childNodes[0]);
        };
        hoop() {
            let ctx = canvas.getContext("2d");
            ctx.strokeStyle = "red";
            ctx.lineWidth = 1;
            let hoopSize = canvas.width/5;
            let hoopStart = (canvas.width/5)*2;
            ctx.moveTo(hoopStart, canvas.height - (canvas.height*.75))
            ctx.lineTo(hoopStart + hoopSize, canvas.height -(canvas.height*.75));
            ctx.stroke();
        }

        backboard() {
            let ctx = canvas.getContext("2d");
            ctx.strokeStyle = "black";
            let hoopSize = canvas.width/5;
            let hoopStartX = (canvas.width/5)*2;
            let hoopStartY = (canvas.height) - canvas.height*.95;
            ctx.strokeRect(hoopStartX-80, hoopStartY, 270, 70);
        }

        ball() {
            let ctx = canvas.getContext("2d");
            ctx.fillStyle = "orange";
            let center = canvas.width/2;
            let bottom = canvas.height - canvas.height/5;
            let size = canvas.width/20
            console.log(bottom, size)
            ctx.beginPath();
            ctx.arc(center, bottom, size, 0, Math.PI * 2);
            ctx.closePath();
            ctx.fill();

        }
}

canvas.addEventListener("click", function (){
    console.log(event.clientX);
    console.log(event.clientY);

})

playGame();