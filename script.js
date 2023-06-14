/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let hue = 0
const mouse = { x: undefined, y: undefined }
const numOfParticles = 10
let particleArr = []
let gameFrame = 0

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

window.addEventListener(
    "mousemove",
    (e) => {
        mouse.x = e.x;
        mouse.y = e.y;

        hue += 3;
        if (hue === 360) hue = 0
        for (let i = 0; i < numOfParticles; i++) {
            particleArr.push(new Particle(ctx))
        }

    }
)

window.addEventListener(
    "click",
    (e) => {
        mouse.x = e.x;
        mouse.y = e.y;

        hue += 3;
        if (hue === 360) hue = 0
        for (let i = 0; i < numOfParticles; i++) {
            particleArr.push(new Particle(ctx))
        }

    }
)

class Particle {
    constructor(context) {
        this.context = context
        this.x = mouse.x
        this.y = mouse.y
        this.radius = Math.random() * 10 + 1
        this.speedX = Math.random() * 3 - 1.5
        this.speedY = Math.random() * 3 - 1.5
        this.color = 'hsl(' + hue + ', 100%, 50%)';
    }

    draw() {
        this.context.beginPath();
        this.context.fillStyle = this.color
        this.context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        this.context.fill();
    }

    update() {
        this.x += this.speedX
        this.y += this.speedY
        this.radius -= 0.1
    }
}

function animate() {
    // ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (gameFrame % 10 === 0){
        for (let i = 0; i < numOfParticles/4; i++) {
            particleArr.push(new Particle(ctx))
        }
        hue+=3
    }
    ctx.fillStyle = "rgba(0,0,0,0.1)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < particleArr.length; i++) {
        particleArr[i].draw()
        particleArr[i].update()

        for (let j = i; j < particleArr.length; j++) {
            const dx = particleArr[i].x - particleArr[j].x
            const dy = particleArr[i].y - particleArr[j].y
            const distance = Math.sqrt(dx * dx + dy * dy)
            if (distance < 100) {
                ctx.beginPath()
                ctx.lineWidth = particleArr[i].radius/10
                ctx.strokeStyle = particleArr[i].color
                ctx.moveTo(particleArr[i].x, particleArr[i].y);
                ctx.lineTo(particleArr[j].x, particleArr[j].y);
                ctx.stroke();
            }
        }
        if (particleArr[i].radius <= 0.2) {
            particleArr.splice(i, 1)
            i--
        }
    }
    gameFrame++
    requestAnimationFrame(animate);
}

animate()