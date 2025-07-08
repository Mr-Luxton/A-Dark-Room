class Particle {
  constructor(canvas) {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height - 60 - Math.random() * 100;
    this.vx = (Math.random() - 0.5) * 0.2;
    this.size = 1 + Math.random() * 2;
    this.life = 200 + Math.random() * 100;
  }
  update() { this.x += this.vx; this.life--; }
  draw(ctx) {
    if (this.life > 0) {
      ctx.fillStyle = 'rgba(200,200,200,0.03)';
      ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); ctx.fill();
    }
  }
}

class ParticleSystem {
  constructor(canvas) {
    this.canvas = canvas;
    this.particles = Array.from({ length: 100 }, () => new Particle(canvas));
  }
  update() {
    this.particles.forEach(p => p.update());
    this.particles = this.particles.filter(p => p.life > 0);
    while (this.particles.length < 100) this.particles.push(new Particle(this.canvas));
  }
  draw(ctx) { this.particles.forEach(p => p.draw(ctx)); }
}
