import { distance } from "../../utils";
import Tube from "../../Characters/tube";

const REDUCE = 0.002;

export default class Ball {
  x: number;
  y: number;
  r: number;
  stageWidth: number;
  stageHeight: number;
  vx: number;
  vy: number;
  $elems: any;
  $rects: any[];
  tube: Tube;
  rotate: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
    this.tube = new Tube({ x: this.x, y: this.y });
    this.tube.changeScale(0.2);
    this.r = 21;
    this.vx = 3;
    this.vy = 3;
    this.$elems = null;
    this.$rects = [];
    this.rotate = 0;
  }

  setRectPos() {
    if (this.$rects.length === 0) {
      this.$elems.forEach((elem: HTMLElement) => {
        // eslint-disable-next-line no-param-reassign
        elem.onload = () => {
          setTimeout(() => {
            const rect = elem.getBoundingClientRect();
            this.$rects.push(rect);
          }, 60);
        };
      });
    } else {
      this.$rects = [];
      this.$elems.forEach((elem: HTMLElement) => {
        // eslint-disable-next-line no-param-reassign
        const rect = elem.getBoundingClientRect();
        this.$rects.push(rect);
      });
    }
  }

  resize(stageWidth: number, stageHeight: number) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.$elems = Array.prototype.slice.call(document.getElementsByTagName("img"));
    this.setRectPos();
  }

  collide() {
    if (this.x - this.r <= 0) {
      this.vx *= -1;
      this.x = this.r;
    } else if (this.x + this.r >= this.stageWidth) {
      this.vx *= -1;
      this.x = this.stageWidth - this.r;
    } else if (this.y + this.r >= this.stageHeight) {
      this.vy *= -1;
      this.y = this.stageHeight - this.r;
    } else if (this.y - this.r <= 0) {
      this.vy *= -1;
      this.y = this.r;
    }

    if (this.$rects.length > 0) {
      this.$rects.forEach((rect: any, idx: number) => {
        if (rect.top <= this.y && this.y <= rect.bottom && distance(this.x, this.y, rect.left, this.y) <= this.r) {
          this.vx *= -1;
        } else if (
          rect.top <= this.y &&
          this.y <= rect.bottom &&
          distance(this.x, this.y, rect.right, this.y) <= this.r
        ) {
          this.vx *= -1;
        } else if (
          rect.left <= this.x &&
          this.x <= rect.right &&
          distance(this.x, this.y, this.x, rect.top) <= this.r
        ) {
          this.vy *= -1;
        } else if (
          rect.left <= this.x &&
          this.x <= rect.right &&
          distance(this.x, this.y, this.x, rect.bottom) <= this.r
        ) {
          this.vy *= -1;
        }
      });
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.setRectPos();
    this.x += this.vx;
    this.y += this.vy;
    if (this.vx >= 0) this.vx -= (Math.abs(this.vx) - Math.abs(1)) * REDUCE;
    else this.vx += (Math.abs(this.vx) - Math.abs(1)) * REDUCE;
    if (this.vy >= 0) this.vy -= (Math.abs(this.vy) - Math.abs(1)) * REDUCE;
    else this.vy += (Math.abs(this.vy) - Math.abs(1)) * REDUCE;
    this.tube.center.x = this.x;
    this.tube.center.y = this.y;
    this.rotate += 1.5;
    this.tube.changeRoate(this.rotate);
    this.collide();
    // ctx.globalCompositeOperation = "overlay";
    ctx.beginPath();
    // ctx.fillStyle = "#ff02f3";
    this.tube.draw(ctx);
    // ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
    ctx.fill();
  }
}
