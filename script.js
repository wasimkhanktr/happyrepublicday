const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

class Firework {
  constructor(x, y, radius, color) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.color = color;
    this.opacity = 1;
    this.speed = Math.random() * 2 + 1;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
    ctx.fill();
    ctx.closePath();
  }

  update() {
    this.opacity -= 0.02;
    this.y -= this.speed;
  }
}

const fireworks = [];

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((firework, index) => {
    if (firework.opacity <= 0) {
      fireworks.splice(index, 1);
    } else {
      firework.update();
      firework.draw();
    }
  });

  if (Math.random() < 0.05) {
    fireworks.push(
      new Firework(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random() * 5 + 3,
        `255, ${Math.random() * 255}, ${Math.random() * 255}`
      )
    );
  }

  requestAnimationFrame(animate);
}

animate();
