import { normalDistribution, randomInt } from "../../utils";

type Center = {
  x: number;
  y: number;
};

export default class Ball {
  center: Center;
  color: string;
  radius: number;
  stageWidth: any;
  stageHeight: any;
  floor: number;
  vx: number;
  vy: number;
  rIncreasement: number;
  idx: number;
  xDirection: number;
  radiusIncreasement: number;
  reductionRate: number;
  hue: number;
  light: number;
  gradient: CanvasGradient;

  constructor(center: Center) {
    this.center = center;
    this.hue = randomInt(30, 60);
    this.light = randomInt(50, 100);
    this.color = `hsla(${this.hue},100%,${this.light}%,1)`;
    this.radius = randomInt(5, 12);
    this.xDirection = Math.random() > 0.5 ? 1 : -1;
    this.vy = normalDistribution(0, 4);
    this.vx = normalDistribution(3, 2);
    this.vx *= this.xDirection;
    this.reductionRate = normalDistribution(0.006, 0.0013);
    this.radiusIncreasement = -(this.radius * this.reductionRate);
  }

  addForce(x: number, y: number) {
    this.center.x += x;
    this.center.y += y;
  }

  multiplyVx(num: number) {
    this.vx *= num;
  }

  multiplyVy(num: number) {
    this.vy *= num;
  }

  setY(num: number) {
    this.center.y = num;
  }

  get getV() {
    return { vx: this.vx, vy: this.vy };
  }

  get getX() {
    return this.center.x;
  }
  get getY() {
    return this.center.y;
  }

  get getR() {
    return this.radius;
  }

  reduceRadius(value: number) {
    this.radius -= value;
  }

  draw(ctx: CanvasRenderingContext2D) {
    //--------------ball gradient
    // const gradient = ctx.createRadialGradient(
    //   this.center.x,
    //   this.center.y,
    //   this.radius / 2,
    //   this.center.x,
    //   this.center.y,
    //   this.radius,
    // );
    // gradient.addColorStop(0, this.color);
    // gradient.addColorStop(1, "white");
    // ctx.fillStyle = gradient;
    // -----------------
    ctx.beginPath();
    ctx.arc(this.center.x, this.center.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }
}
