const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gravity = 0.5;
const friction = 0.8;

class Player {
    constructor() {
        this.width = 40;
        this.height = 40;
        this.x = canvas.width / 2 - this.width / 2;
        this.y = canvas.height - this.height;
        this.speed = 5;
        this.velocityX = 0;
        this.velocityY = 0;
        this.jumping = false;
    }

    draw() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }

    update() {
        this.velocityY += gravity;
        this.x += this.velocityX;
        this.y += this.velocityY;

        // Collision detection with canvas boundaries
        if (this.x <= 0) {
            this.x = 0;
        } else if (this.x + this.width >= canvas.width) {
            this.x = canvas.width - this.width;
        }

        if (this.y + this.height >= canvas.height) {
            this.y = canvas.height - this.height;
            this.jumping = false;
            this.velocityY = 0;
        }

        this.velocityX *= friction;
    }
}

const player = new Player();

const keys = {
    right: false,
    left: false,
    up: false
};

document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowRight') keys.right = true;
    if (e.code === 'ArrowLeft') keys.left = true;
    if (e.code === 'ArrowUp') keys.up = true;
});

document.addEventListener('keyup', (e) => {
    if (e.code === 'ArrowRight') keys.right = false;
    if (e.code === 'ArrowLeft') keys.left = false;
    if (e.code === 'ArrowUp') keys.up = false;
});

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (keys.right) player.velocityX = player.speed;
    if (keys.left) player.velocityX = -player.speed;
    if (keys.up && !player.jumping) {
        player.jumping = true;
        player.velocityY = -10;
    }

    player.update();
    player.draw();

    requestAnimationFrame(gameLoop);
}

gameLoop();
