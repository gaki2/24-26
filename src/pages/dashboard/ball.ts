import Vector from "./vector";
import { distance } from "../../utils";
import Tube from "../../Characters/tube";

const REDUCE = 0.002;

export default class Ball {
  r: number;
  rotate: number;
  pos: { x: number; y: number };
  ball: Tube;
  v: Vector;

  constructor(x: number, y: number) {
    this.pos = { x, y };
    this.ball = new Tube(this.pos);
    this.ball.changeScale(0.2);
    this.r = 16 + 5 * Math.random();
    this.v = new Vector(3, 3);
    this.rotate = 0;
  }

  getX() {
    return this.pos.x;
  }

  setX(x: number) {
    this.pos.x = x;
  }

  getY() {
    return this.pos.y;
  }

  setY(y: number) {
    this.pos.y = y;
  }

  getR() {
    return this.r;
  }

  getV() {
    return this.v;
  }

  setV(v: Vector) {
    this.v = v;
  }

  // equals to vx *= -1
  reverseVx() {
    const reversedVx = this.getV().multiplyX(-1);
    this.setV(reversedVx);
  }

  // equals to vy *= -1
  reverseVy() {
    const reversedVy = this.getV().multiplyY(-1);
    this.setV(reversedVy);
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.pos.x += this.v.x;
    this.pos.y += this.v.y;
    if (this.v.x >= 0) this.v.x -= (Math.abs(this.v.x) - Math.abs(1)) * REDUCE;
    else this.v.x += (Math.abs(this.v.x) - Math.abs(1)) * REDUCE;
    if (this.v.y >= 0) this.v.y -= (Math.abs(this.v.y) - Math.abs(1)) * REDUCE;
    else this.v.y += (Math.abs(this.v.y) - Math.abs(1)) * REDUCE;
    this.ball.center.x = this.pos.x;
    this.ball.center.y = this.pos.y;
    this.rotate += 1.5;
    this.ball.changeRoate(this.rotate);
    // ctx.globalCompositeOperation = "overlay";
    ctx.beginPath();
    // ctx.fillStyle = "#ff02f3";
    this.ball.draw(ctx);
    // ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.fill();
  }
}
