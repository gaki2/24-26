import { distance } from "../../../utils";

export default class Ripple {
  radius: number;
  speed: number;
  x: number;
  y: number;
  finish: boolean;
  stageWidth: number;
  stageHeight: number;
  maxD: number;
  constructor() {
    this.radius = 0;
    this.speed = 90;
    this.finish = false;
  }

  resize(stageWidht: number, stageHeight: number) {
    this.stageWidth = stageWidht;
    this.stageHeight = stageHeight;
  }

  getMaxCorner() {
    const d1 = distance(this.x, this.y, 0, 0);
    const d2 = distance(this.x, this.y, this.stageWidth, 0);
    const d3 = distance(this.x, this.y, 0, this.stageHeight);
    const d4 = distance(this.x, this.y, this.stageWidth, this.stageHeight);
    return Math.max(d1, d2, d3, d4);
  }

  start(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.finish = false;
    this.maxD = this.getMaxCorner();
  }

  draw(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, color: string) {
    if (this.radius > this.maxD) {
      this.finish = true;
      this.radius = 0;
      // eslint-disable-next-line no-param-reassign
      canvas.style.backgroundColor = color;
    }
    if (!this.finish) {
      this.radius += this.speed;
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fill();
      ctx.closePath();
    }
  }
}
