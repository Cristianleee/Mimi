const canvas = document.getElementById("backgroundCanvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const particles = [];
const flowers = [];
const bubbles = [];
const colors = ["#ff4b5c", "#ff7eb3", "#ffbfd8", "#ffd3b5", "#ff9a9e"];

class Particle {
    constructor(x, y, size, color, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.speedY = speedY;
        this.opacity = 1;
    }

    update() {
        this.y += this.speedY;
        this.opacity -= 0.005;
    }

    draw() {
        ctx.globalAlpha = this.opacity;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

class Flower {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.angle = Math.random() * 360;
        this.speed = Math.random() * 1.5 + 0.5;
        this.offset = Math.random() * 50;
    }

    update() {
        this.y += this.speed;
        this.x += Math.sin(this.angle) * 0.5;
        this.angle += 0.02;
    }

    draw() {
        ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

class Bubble {
    constructor(x, y, size, speedY) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speedY = speedY;
    }

    update() {
        this.y -= this.speedY;
        if (this.y < -this.size) this.y = canvas.height + this.size;
    }

    draw() {
        ctx.strokeStyle = "rgba(255, 255, 255, 0.5)";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.stroke();
    }
}

function createParticles(x, y) {
    for (let i = 0; i < 10; i++) {
        particles.push(new Particle(x, y, Math.random() * 5 + 2, "white", Math.random() * -2 - 1));
    }
}

function createFlowers() {
    for (let i = 0; i < 20; i++) {
        flowers.push(new Flower(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 5 + 5));
    }
}

function createBubbles() {
    for (let i = 0; i < 10; i++) {
        bubbles.push(new Bubble(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 10 + 5, Math.random() * 1 + 0.5));
    }
}

canvas.addEventListener("mousemove", (e) => {
    createParticles(e.clientX, e.clientY);
});

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    flowers.forEach((flower, index) => {
        flower.update();
        flower.draw();
        if (flower.y > canvas.height) flowers[index] = new Flower(Math.random() * canvas.width, -10, flower.size);
    });

    particles.forEach((particle, index) => {
        particle.update();
        particle.draw();
        if (particle.opacity <= 0) particles.splice(index, 1);
    });

    bubbles.forEach((bubble) => {
        bubble.update();
        bubble.draw();
    });

    requestAnimationFrame(animate);
}

window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    flowers.length = 0;
    bubbles.length = 0;
    createFlowers();
    createBubbles();
});

createFlowers();
createBubbles();
animate();