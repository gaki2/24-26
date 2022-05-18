import { roundRect } from "../../util/canvas";

type COLORTYPE = {
  r: number;
  g: number;
  b: number;
};
const Acc = 0.15;
export default class Dot {
  x: number;
  y: number;
  width: number;
  height: number;

  pixelNum: number;
  color: COLORTYPE;
  lastY: boolean;
  radius: number;
  radiusM: number;
  radiusV: number;
  lastX: boolean;
  pixelRatio: number;
  is_Color_Prepared: boolean;
  constructor(x: number, y: number, width: number, height: number, lastY: boolean, lastX: boolean, pixelRatio: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.pixelNum = this.width * this.height;
    this.lastY = lastY;
    this.lastX = lastX;
    this.pixelRatio = pixelRatio;
    this.radius = 0;
    this.radiusM = 30;
    this.radiusV = 0;
    this.is_Color_Prepared = false;
  }

  isReady() {
    if (this.is_Color_Prepared) {
      return true;
    }
    return false;
  }

  // 좌상단, 우하단, 가운데 픽셀값의 평균으로 색깔을 결정함
  getColor(ctx: CanvasRenderingContext2D) {
    this.is_Color_Prepared = true;
    const imgData = ctx.getImageData(
      this.x * this.pixelRatio,
      this.y * this.pixelRatio,
      this.width * this.pixelRatio,
      this.height * this.pixelRatio,
    ).data;
    const avgRgba: COLORTYPE = {
      r: 0,
      g: 0,
      b: 0,
    };
    if (this.lastY || this.lastX) {
      const color = imgData.slice(0, 4);
      this.color = {
        r: color[0],
        g: color[1],
        b: color[2],
      };
      return;
    }

    for (let i = 0; i < this.pixelNum; i += 3) {
      const nowRgba = imgData.slice(i * 4, (i + 1) * 4);
      avgRgba.r += nowRgba[0] / Math.floor(this.pixelNum / 3);
      avgRgba.g += nowRgba[1] / Math.floor(this.pixelNum / 3);
      avgRgba.b += nowRgba[2] / Math.floor(this.pixelNum / 3);
    }
    Object.keys(avgRgba).forEach((key) => {
      avgRgba[key as keyof COLORTYPE] = Math.floor(avgRgba[key as keyof COLORTYPE]);
    });
    this.color = avgRgba;
  }

  draw(ctx: CanvasRenderingContext2D) {
    const accel = (this.radiusM - this.radius) / 2;
    this.radiusV += accel;
    this.radiusV *= Acc;
    this.radius += this.radiusV;
    ctx.beginPath();
    ctx.fillStyle = "rgba(0,0,0,0.9)";
    ctx.fillRect(this.x, this.y, this.width, this.height);
    ctx.fillStyle = `rgb(${this.color.r}, ${this.color.g}, ${this.color.b})`;
    roundRect(ctx, this.x, this.y, this.radius, this.radius, 5);
    ctx.fill();
    ctx.closePath();
  }
}
