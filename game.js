let canvas, ctx, player;

function initGame() {
  canvas = document.getElementById("game-canvas");
  ctx = canvas.getContext("2d");
  resizeCanvas();

  player = new Player(canvas.width / 2, canvas.height - 100);

  window.addEventListener("resize", resizeCanvas);
  requestAnimationFrame(gameLoop);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  player.update();
  player.draw(ctx);
  requestAnimationFrame(gameLoop);
}

function drawBackground() {
  let grd = ctx.createRadialGradient(
    canvas.width / 2, canvas.height / 2, 100,
    canvas.width / 2, canvas.height / 2, canvas.width / 1.5
  );
  grd.addColorStop(0, "#111");
  grd.addColorStop(1, "#000");

  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#111";
  ctx.beginPath();
  ctx.moveTo(0, canvas.height - 60);
  ctx.quadraticCurveTo(canvas.width / 2, canvas.height - 100, canvas.width, canvas.height - 60);
  ctx.lineTo(canvas.width, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.closePath();
  ctx.fill();
}

function startGame() {
  initGame();
}

