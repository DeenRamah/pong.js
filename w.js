let canvas = document.getElementById('canvas');
let ctx = canvas.getContext('2d');

canvas.width = 640;
canvas.height = 480;

let ball = {
 x: canvas.width / 2,
 y: canvas.height / 2,
 size: 20,
 speedX: 5,
 speedY: 5
};

let paddle = {
 height: 100,
 width: 10,
 x: 0,
 y: (canvas.height - 100) / 2,
 speed: 5
};

let leftPaddle = Object.assign({}, paddle);
let rightPaddle = Object.assign({}, paddle);
rightPaddle.x = canvas.width - rightPaddle.width;

function draw() {
 ctx.clearRect(0, 0, canvas.width, canvas.height);

 ctx.fillStyle = 'white';
 ctx.fillRect(leftPaddle.x, leftPaddle.y, leftPaddle.width, leftPaddle.height);
 ctx.fillRect(rightPaddle.x, rightPaddle.y, rightPaddle.width, rightPaddle.height);

 ctx.beginPath();
 ctx.arc(ball.x, ball.y, ball.size, 0, Math.PI * 2);
 ctx.fill();
 ctx.closePath();
}

function update() {
 ball.x += ball.speedX;
 ball.y += ball.speedY;

 if (ball.y - ball.size < 0 || ball.y + ball.size > canvas.height) {
    ball.speedY = -ball.speedY;
 }

 if (ball.x - ball.size < leftPaddle.x + leftPaddle.width &&
      ball.y > leftPaddle.y &&
      ball.y < leftPaddle.y + leftPaddle.height) {
    ball.speedX = -ball.speedX;
 }

 if (ball.x + ball.size > rightPaddle.x &&
      ball.y > rightPaddle.y &&
      ball.y < rightPaddle.y + rightPaddle.height) {
    ball.speedX = -ball.speedX;
 }

 if (ball.x - ball.size < 0) {
    ball.x = canvas.width / 2;
    ball.y = canvas.height / 2;
 }
}

document.addEventListener('keydown', (e) => {
 if (e.key === 'ArrowUp') {
    rightPaddle.y -= rightPaddle.speed;
 }
 if (e.key === 'ArrowDown') {
    rightPaddle.y += rightPaddle.speed;
 }
});

function gameLoop() {
 draw();
 update();
 requestAnimationFrame(gameLoop);
}

gameLoop();