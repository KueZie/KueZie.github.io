const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = 1000;
canvas.height = 500;


const mouse = {
	x: undefined,
  y: undefined
}

function dist(x1,y1,x2,y2) {
	const a = Math.pow((x2 - x1), 2);
	const b = Math.pow((y2 - y1), 2);
  return Math.sqrt(a + b);
}

class Ball {
	constructor() {
  	this.x = undefined;
    this.y = undefined;
    this.xv = undefined;
    this.yv = undefined;
    this.color = undefined;
    this.r = undefined;
    this.bloated = false;
  }
  random() {
  	this.r = Math.round(((Math.random() * 18) + 2));
    this.maxR = this.r * 2;
    this.minR = this.r;
  	this.x = Math.random() * (canvas.width - this.r * 2) + this.r;
		this.y = Math.random() * (canvas.height - this.r * 2) + this.r;
    console.log(this.x, this.y)
    this.xv = Math.round(Math.random() * 4) - 2;
    this.yv = Math.round(Math.random() * 4) - 2;
  }
  randomColor() {
  	const r = Math.round(Math.random() * 255);
    const g = Math.round(Math.random() * 255);
    const b = Math.round(Math.random() * 255);
    const a = ((Math.random() * 7) / 10) + 0.2;
    this.color = `rgba(${r},${g},${b},${a})`;
  }
  addVelocity() {
  	this.x += this.xv;
    this.y += this.yv;
  }
  draw() {
  	ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x,this.y,this.r,0,Math.PI*2,false);
    ctx.fill();
    ctx.closePath();
  }
  isCloseToMouse(){
  	const close = dist(this.x, this.y, mouse.x, mouse.y) < 100;
    if (!close) {
    	if (this.r >= this.minR) {
      	this.r -= 2;
      } else {
      	this.bloated = false;
      }
      this.bloated = false;
    } else if (close) {
    	if (this.r < this.maxR) {
      	this.r += 2;
      } 
      this.bloated = true;
    }
  }
  collision() {
  	if (this.x + this.r >= canvas.width || this.x - this.r <= 0){
    	this.xv *= -1;
    }
    if (this.y + this.r >= canvas.height || this.y - this.r <= 0) {
    	this.yv *= -1;
    }
  }
}

canvas.addEventListener('mousemove', (e) => {
	mouse.x = e.offsetX;
  mouse.y = e.offsetY;
});
canvas.addEventListener('mouseout', () => {
	mouse.x = canvas.width * 100;
  mouse.y = canvas.height * 100;
})

const entities = [];

for (let i = 0; i < 800; i++) {
	const newObj = new Ball();
  newObj.random();
  newObj.randomColor();
  entities.push(newObj);
}

function animate() {
	requestAnimationFrame(animate);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  for (let ball of entities) {
  	console.log(ball.r)
  	ball.collision();
    ball.isCloseToMouse();
    ball.addVelocity();
    ball.draw();
  }
}
animate();
