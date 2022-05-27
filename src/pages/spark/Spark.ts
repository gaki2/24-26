import Ball from "./ball";

export default class Spark {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  reflectionCanvas: HTMLCanvasElement;
  reflectionCtx: CanvasRenderingContext2D | null;
  mouseX: number;
  mouseY: number;
  balls: Ball[];
  stageWidth: number;
  stageHeight: number;
  floor: number;
  requestId: number;
  resizeHandler: () => void;
  onMoveHandler: (e: MouseEvent) => void;
  createBallInterval: number;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.classList.add("original-canvas");
    this.reflectionCanvas = document.createElement("canvas");
    this.reflectionCanvas.classList.add("reflect-canvas");
    this.ctx = this.canvas.getContext("2d");
    this.reflectionCtx = this.reflectionCanvas.getContext("2d");
    this.balls = [];
    this.resizeHandler = this.resize.bind(this);
    this.resize();
    this.onMoveHandler = this.onMove.bind(this);
    this.mouseX = this.stageWidth / 2;
    this.mouseY = this.stageHeight * 0.6;
  }

  initEvent() {
    window.addEventListener("resize", this.resizeHandler, false);
    window.addEventListener("mousemove", this.onMoveHandler, false);
    setTimeout(() => {
      this.createBallInterval = setInterval(this.createBall.bind(this), 30);
    }, 1500);
  }

  onMove(e: MouseEvent) {
    this.mouseX = e.clientX;
    this.mouseY = e.clientY;
  }

  createBall() {
    const ball = new Ball({ x: this.mouseX, y: this.mouseY });
    this.balls.push(ball);
  }

  floorCollide(ball: Ball) {
    if (ball.getY + ball.getR > this.canvas.height) {
      ball.setY(this.canvas.height - ball.getR);
      ball.multiplyVy(-0.5);
    }
  }

  move(ball: Ball) {
    const GRAVITY = 3;
    ball.vy += 0.4;
    ball.multiplyVx(0.99);
    ball.addForce(ball.getV.vx, ball.getV.vy);
    ball.reduceRadius(0.04);
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight * 0.6;
    this.floor = this.canvas.height;
    this.reflectionCanvas.width = this.stageWidth;
    this.reflectionCanvas.height = this.stageHeight * 0.6;
  }

  display() {
    this.ctx?.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.balls = this.balls.filter((ball) => ball.getR > 0);
    this.reflectionCtx?.clearRect(0, 0, this.stageWidth, this.stageHeight);
    for (let i = 0; i < this.balls.length; i += 1) {
      const ball = this.balls[i];
      this.move(ball);
      this.floorCollide(ball);
      if (ball.getR > 0) {
        ball.draw(this.ctx!);
        ball.draw(this.reflectionCtx!);
      }
    }
    this.requestId = window.requestAnimationFrame(this.display.bind(this));
  }

  attachTo($parent: HTMLElement) {
    $parent.classList.add("overflow-hidden-style");
    $parent.appendChild(this.canvas);
    $parent.appendChild(this.reflectionCanvas);
    this.initEvent();
    this.display();
  }

  removeFrom($parent: HTMLElement) {
    $parent.classList.remove("overflow-hidden-style");
    this.ctx?.clearRect(0, 0, this.stageWidth, this.stageHeight);
    $parent.removeChild(this.canvas);
    $parent.removeChild(this.reflectionCanvas);
    this.removeEvent();
  }

  removeEvent() {
    window.cancelAnimationFrame(this.requestId);
    window.removeEventListener("resize", this.resizeHandler, false);
    window.removeEventListener("mousemove", this.onMoveHandler, false);
    clearInterval(this.createBallInterval);
  }
}
