class Collectible {
  constructor(canvas) {
    this.x = canvas.width / 2 + 100;
    this.y = canvas.height - 100;
    this.size = 20;
    this.collected = false;
    this.img = new Image(); this.img.src = 'assets/echo.png';
  }
  check(player) {
    if (this.collected) return;
    const dx = player.x - this.x, dy = player.y - this.y;
    if (Math.hypot(dx, dy) < 30) {
      this.collected = true;
      console.log("Echo collected!");
    }
  }
  draw(ctx) {
    if (!this.collected) {
      ctx.globalAlpha = 0.7;
      ctx.drawImage(this.img, this.x, this.y, this.size, this.size);
      ctx.globalAlpha = 1;
    }
  }
}

class CollectibleSystem {
  constructor(canvas) {
    this.objects = [new Collectible(canvas)];
  }
  update(player) { this.objects.forEach(o => o.check(player)); }
  draw(ctx) { this.objects.forEach(o => o.draw(ctx)); }
}
