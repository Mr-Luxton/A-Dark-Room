class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = 0;
    this.vy = 0;
    this.width = 20;
    this.height = 40;
    this.onGround = false;
    this.speed = 2.5;
    this.jumpPower = -7;
  }

  update() {
    const keys = getPressedKeys();

    if (keys.left) this.vx = -this.speed;
    else if (keys.right) this.vx = this.speed;
    else this.vx = 0;

    if (keys.jump && this.onGround) {
      this.vy = this.jumpPower;
      this.onGround = false;
    }

    this.vy += 0.3;
    this.x += this.vx;
    this.y += this.vy;

    if (this.y + this.height > canvas.height - 60) {
      this.y = canvas.height - 60 - this.height;
      this.vy = 0;
      this.onGround = true;
    }
  }

  draw(ctx) {
    ctx.fillStyle = "black";
    ctx.beginPath();
    ctx.arc(this.x + this.width / 2, this.y + 10, 6, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(this.x, this.y + 15, this.width, this.height - 15);
  }
}

const keysHeld = {};

window.addEventListener("keydown", (e) => keysHeld[e.key.toUpperCase()] = true);
window.addEventListener("keyup", (e) => keysHeld[e.key.toUpperCase()] = false);

function getPressedKeys() {
  return {
    left: keysHeld[keyBindings.left],
    right: keysHeld[keyBindings.right],
    jump: keysHeld[keyBindings.jump],
    crouch: keysHeld[keyBindings.crouch]
  };
}

