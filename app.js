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

let shotDeltaX, shotDeltaY, shotBool, shotAngle, shotHypoteneuse, shotSin, moveInterval,
shotInfo, direction, magnitude, directionGuage, magnitudeGuage

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


canvas.addEventListener("mousedown", grab);
canvas.addEventListener("mouseup", release);
canvas.addEventListener("touchstart", grab);
canvas.addEventListener("touchend", release);
reset.addEventListener("click", clearCourt);

renderCourt();



