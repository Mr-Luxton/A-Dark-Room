let canvas, ctx, player, particles, collectibles, bgLayers = [];

function loadBG() {
  const urls = ['assets/bg_layer1.png', 'assets/bg_layer2.png', 'assets/bg_layer3.png'];
  bgLayers = urls.map((src, i) => {
    const img = new Image(); img.src = src;
    return { img, x: 0, speed: (i + 1) * 0.2 };
  });
}

function initGame() {
  canvas = document.getElementById("game-canvas");
  ctx = canvas.getContext("2d");
  resizeCanvas();
  loadBG();
  player = new Player(canvas.width / 2, canvas.height - 100);
  particles = new ParticleSystem(canvas);
  collectibles = new CollectibleSystem(canvas);
  window.addEventListener("resize", resizeCanvas);
  animateFade();
}

function animateFade() {
  const fade = document.getElementById("fade-overlay");
  fade.classList.remove("fade-out");
  setTimeout(() => fade.classList.add("fade-out"), 100);
  requestAnimationFrame(gameLoop);
}

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function gameLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBackground();
  particles.update(); particles.draw(ctx);
  collectibles.update(player); collectibles.draw(ctx);
  player.update(); player.draw(ctx);
  requestAnimationFrame(gameLoop);
}

function drawBackground() {
  bgLayers.forEach((layer, i) => {
    layer.x = (layer.x - layer.speed) % canvas.width;
    ctx.globalAlpha = 1 - i * 0.3;
    ctx.drawImage(layer.img, layer.x, 0, canvas.width, canvas.height);
    ctx.drawImage(layer.img, layer.x + canvas.width, 0, canvas.width, canvas.height);
  });
  ctx.globalAlpha = 1;
  ctx.fillStyle = '#111';
  ctx.beginPath();
  ctx.moveTo(0, canvas.height - 60);
  ctx.quadraticCurveTo(canvas.width / 2, canvas.height - 100, canvas.width, canvas.height - 60);
  ctx.lineTo(canvas.width, canvas.height);
  ctx.lineTo(0, canvas.height);
  ctx.closePath(); ctx.fill();
}

function startGame() {
  initGame();
}
