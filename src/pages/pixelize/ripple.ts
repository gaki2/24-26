import Dot from "./dot";
// 왼쪽에서 오른쪽으로 움직이는 ripple
export default class Ripple {
  v: number;
  dotWidth: number;
  stageHeight: number;
  stageWidth: number;
  dots: Dot[];
  pos: { x: number };
  pixelRatio: number;
  acc: number;
  unitV: number;

  constructor(stageWidth: number, stageHeight: number) {
    this.pos = {
      x: 0,
    };
    this.v = 40;
    this.dotWidth = 30;
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    this.dots = [];
    this.pixelRatio = window.devicePixelRatio > 1 ? 1 : 1;
    this.acc = 1.04;
  }

  // ripple 하기 전 초기의 상태로 state 값을 되돌림
  reset() {
    this.pos.x = 0;
    this.v = 40;
  }

  // stageWidth 와 stageHeight 를 조정
  resize(stageWidth: number, stageHeight: number) {
    this.stageWidth = stageWidth;
    this.stageHeight = stageHeight;
    // 화면이 resize 될때, dot 을 화면에 맞게 다시 생성함.
    this.pixelize();
  }

  reverse() {
    // v 의 방향을 반대로 하고 v 의 속력을 40으로 만듦
    this.unitV = this.v / Math.abs(this.v);
    this.v = -1 * this.unitV * 40;
    if (this.v > 0) {
      this.pos.x = 0;
    } else {
      this.pos.x = this.stageWidth;
    }
  }

  pixelize() {
    this.dots = [];
    let lastY = false;
    let lastX = false;
    for (let y = 0; y < Math.ceil(this.stageHeight / this.dotWidth) + 1; y += 1) {
      for (let x = 0; x < Math.ceil(this.stageWidth / this.dotWidth) + 1; x += 1) {
        if (y * this.dotWidth + this.dotWidth >= this.stageHeight) {
          lastY = true;
        }
        if (x * this.dotWidth + this.dotWidth >= this.stageWidth) {
          lastX = true;
        } else {
          lastX = false;
        }
        const dot = new Dot(
          x * this.dotWidth,
          y * this.dotWidth,
          this.dotWidth,
          this.dotWidth,
          lastY,
          lastX,
          this.pixelRatio,
        );
        this.dots.push(dot);
      }
    }
  }

  animate(ctx: CanvasRenderingContext2D) {
    this.v *= this.acc;
    this.pos.x += this.v;
    for (let i = 0; i < this.dots.length; i += 1) {
      const nowDot = this.dots[i];
      if (this.pos.x >= nowDot.x) {
        // Dot 이 ctx 에서 색상을 추출해 평균색상을 구하지 못했다면, 평균색상을 구하도록 명령
        if (!nowDot.isReady()) {
          nowDot.getColor(ctx);
        }
        nowDot.draw(ctx);
      }
    }
  }
}
