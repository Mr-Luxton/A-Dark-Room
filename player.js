class Player {
  constructor(x, y) {
    this.x = x; this.y = y;
    this.vx = 0; this.vy = 0;
    this.w = 20; this.h = 40;
    this.onGround = false;
    this.speed = 2.5;
    this.jumpP = -7;
    this.blinkTimer = 0;
    this.showEyes = true;
  }
  update() {
    const keys = getPressedKeys();
    this.vx = keys.left ? -this.speed : keys.right ? this.speed : 0;
    if (keys.jump && this.onGround) { this.vy = this.jumpP; this.onGround = false; }
    this.vy += 0.3;
    this.x += this.vx;
    this.y += this.vy;
    if (this.y + this.h > canvas.height - 60) {
      this.y = canvas.height - 60 - this.h;
      this.vy = 0; this.onGround = true;
    }
    this.blinkTimer++;
    if (this.blinkTimer > 200) this.showEyes = false;
    if (this.blinkTimer > 220) { this.showEyes = true; this.blinkTimer = 0; }
  }
  draw(ctx) {
    ctx.fillStyle = 'black';
    ctx.beginPath(); ctx.arc(this.x + this.w / 2, this.y + 10, 6, 0, 2 * Math.PI); ctx.fill();
    if (this.showEyes) {
      ctx.fillStyle = 'white';
      ctx.beginPath();
      ctx.arc(this.x + this.w / 2 - 2, this.y + 8, 1, 0, 2 * Math.PI);
      ctx.arc(this.x + this.w / 2 + 2, this.y + 8, 1, 0, 2 * Math.PI);
      ctx.fill();
    }
    ctx.fillRect(this.x, this.y + 15, this.w, this.h - 15);
  }
}

const keysHeld = {};
window.addEventListener("keydown", e => keysHeld[e.key.toUpperCase()] = true);
window.addEventListener("keyup", e => keysHeld[e.key.toUpperCase()] = false);
function getPressedKeys() {
  return {
    left: keysHeld[keyBindings.left],
    right: keysHeld[keyBindings.right],
    jump: keysHeld[keyBindings.jump],
    crouch: keysHeld[keyBindings.crouch]
  };
}
