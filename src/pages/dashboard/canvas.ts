import Ball from "./ball";
import Ripple from "./ripple";
import { distance } from "../../utils";
import Lion from "../../Characters/lion";
import Apeach from "../../Characters/apeach";
import Tube from "../../Characters/tube";
import CustomComponent from "../../customComponent/CustomComponent";

export default class CanvasBackground {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  stageWidth: number;
  stageHeight: number;
  resizeHandler: () => void;
  ball: Ball;
  $elems: HTMLElement[];
  DOMRectPos: DOMRect[];
  animationId: number;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.resizeHandler = this.resize.bind(this);
    this.DOMRectPos = [];
    window.addEventListener("resize", this.resizeHandler, false);
  }

  resize() {
    this.stageWidth = window.innerWidth;
    this.stageHeight = window.innerHeight;
    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
    this.getImageAnchorPos();
  }

  createBall() {
    this.ball = new Ball(10, 10);
  }

  collide() {
    if (this.ball.getX() - this.ball.getR() <= 0) {
      this.ball.reverseVx();
      this.ball.setX(this.ball.getR());
    } else if (this.ball.getX() + this.ball.getR() >= this.stageWidth) {
      this.ball.reverseVx();
      this.ball.setX(this.stageWidth - this.ball.getR());
    } else if (this.ball.getY() + this.ball.getR() >= this.stageHeight) {
      this.ball.reverseVy();
      this.ball.setY(this.stageHeight - this.ball.getR());
    } else if (this.ball.getY() - this.ball.getR() <= 0) {
      this.ball.reverseVy();
      this.ball.setY(this.ball.getR());
    }

    if (this.DOMRectPos.length > 0) {
      this.DOMRectPos.forEach((rect: any) => {
        if (
          rect.top <= this.ball.getY() &&
          this.ball.getY() <= rect.bottom &&
          distance(this.ball.getX(), this.ball.getY(), rect.left, this.ball.getY()) <= this.ball.getR()
        ) {
          this.ball.reverseVx();
        } else if (
          rect.top <= this.ball.getY() &&
          this.ball.getY() <= rect.bottom &&
          distance(this.ball.getX(), this.ball.getY(), rect.right, this.ball.getY()) <= this.ball.getR()
        ) {
          this.ball.reverseVx();
        } else if (
          rect.left <= this.ball.getX() &&
          this.ball.getX() <= rect.right &&
          distance(this.ball.getX(), this.ball.getY(), this.ball.getX(), rect.top) <= this.ball.getR()
        ) {
          this.ball.reverseVy();
        } else if (
          rect.left <= this.ball.getX() &&
          this.ball.getX() <= rect.right &&
          distance(this.ball.getX(), this.ball.getY(), this.ball.getX(), rect.bottom) <= this.ball.getR()
        ) {
          this.ball.reverseVy();
        }
      });
    }
  }

  getImageAnchorPos() {
    this.$elems = Array.prototype.slice.call(document.getElementsByTagName("img"));
    if (this.DOMRectPos.length === 0) {
      this.$elems.forEach((elem: HTMLElement) => {
        // eslint-disable-next-line no-param-reassign
        elem.onload = () => {
          setTimeout(() => {
            const rect = elem.getBoundingClientRect();
            this.DOMRectPos.push(rect);
          }, 60);
        };
      });
    } else {
      this.DOMRectPos = [];
      this.$elems.forEach((elem: HTMLElement) => {
        // eslint-disable-next-line no-param-reassign
        const rect = elem.getBoundingClientRect();
        this.DOMRectPos.push(rect);
      });
    }
  }

  attachTo(parentNode: HTMLElement) {
    parentNode.appendChild(this.canvas);
  }

  detach() {
    window.removeEventListener("resize", this.resizeHandler, false);
  }

  display() {
    this.ctx?.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.animationId = window.requestAnimationFrame(this.display.bind(this));

    // 이미지 hover 시 이미지가 커지는 css 효과에서 공의 충돌을 정확하게 구현하려면, 매 프래임마다 Rect 의 위치를 계속 갱신해야함.
    this.getImageAnchorPos();
  }
}

// export default class Canvas {
//   canvas: HTMLCanvasElement | null;
//   stageWidth: number;
//   stageHeight: number;
//   resize: () => void;
//   resizeHandler: () => void;
//   ctx: CanvasRenderingContext2D | null;
//   reqId: number;
//   ball: Ball;
//   ripple: Ripple;
//   onClick: (e: MouseEvent) => void;
//   onClickHandler: (e: MouseEvent) => void;
//   rippleStart: boolean;
//   colors: string[];
//   colorIdx: number;
//   lion: Lion;
//   apeach: Apeach;
//   tube: Tube;
//   onMouseMove: (e: MouseEvent) => void;
//   onMouseOut: (e: MouseEvent) => void;

//   constructor() {
//     this.canvas = document.createElement("canvas");
//     this.ctx = this.canvas.getContext("2d");
//     this.resizeHandler = this.resize.bind(this);
//     window.addEventListener("resize", this.resizeHandler, false);
//     window.removeEventListener("resize", this.resizeHandler, false);
//   }

//   resize() {
//     this.stageWidth = window.innerWidth;
//     this.stageHeight = window.innerHeight;
//     this.canvas.width = this.stageWidth;
//     this.canvas.height = this.stageHeight;
//     this.ball.resize(this.stageWidth, this.stageHeight);
//     this.ripple.resize(this.stageWidth, this.stageHeight);
//   }

//   init() {
//     this.colors = ["#CE7082", "#f0cf61", "#167c80", "#32b67a", "#2596be"];
//     this.colorIdx = -1;
//     this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
//     this.ctx = this.canvas.getContext("2d");
//     this.ball = new Ball(0, 0);
//     this.ripple = new Ripple();
//     this.rippleStart = false;
//     this.resize = function () {
//       this.stageWidth = window.innerWidth;
//       this.stageHeight = window.innerHeight;
//       this.canvas!.width = this.stageWidth;
//       this.canvas!.height = this.stageHeight;
//       this.ball.resize(this.stageWidth, this.stageHeight);
//       this.ripple.resize(this.stageWidth, this.stageHeight);
//     };
//     this.resizeHandler = this.resize.bind(this);
//     this.resizeHandler();
//     window.addEventListener("resize", this.resizeHandler, true);
//     this.onClick = function (e: MouseEvent) {
//       const x = e.clientX;
//       const y = e.clientY;
//       const d = distance(x, y, this.ball.x, this.ball.y);
//       if (d < this.ball.r * 3) {
//         this.colorIdx += 1;
//         if (this.colorIdx >= this.colors.length) this.colorIdx = 0;
//         this.ripple.start(x, y);
//         this.rippleStart = true;
//         this.ball.x = 20 + Math.random() * this.stageWidth * 0.8;
//         this.ball.y =
//           Math.random() > 0.5
//             ? 20 + Math.random() * this.stageHeight * 0.1
//             : this.stageHeight - 20 - Math.random() * this.stageHeight * 0.1;
//         this.ball.vx = -5 + Math.random() * 10;
//         this.ball.vy = -5 + Math.random() * 10;
//       }
//     };
//     this.onClickHandler = this.onClick.bind(this);
//     window.addEventListener("click", this.onClickHandler, true);

//     this.onMouseMove = function (e: MouseEvent) {
//       const x = e.clientX;
//       const y = e.clientY;
//       const d = distance(x, y, this.ball.x, this.ball.y);
//       if (d < this.ball.r * 2) {
//         document.body.style.cursor = "pointer";
//       } else {
//         document.body.style.cursor = "default";
//       }
//     };
//     this.onMouseMove = this.onMouseMove.bind(this);
//     window.addEventListener("mousemove", this.onMouseMove, true);
//   }

//   draw() {
//     if (!this.canvas) {
//       this.init();
//     }
//     this.ctx?.clearRect(0, 0, this.stageWidth, this.stageHeight);
//     if (this.rippleStart) {
//       this.ripple.draw(this.ctx!, this.canvas!, this.colors[this.colorIdx]);
//     }
//     this.ball.draw(this.ctx!);

//     this.reqId = window.requestAnimationFrame(this.draw.bind(this));
//   }

//   delete() {
//     if (this.canvas) {
//       this.ctx?.clearRect(0, 0, this.stageWidth, this.stageHeight);
//       this.canvas = null;
//       window.removeEventListener("resize", this.resizeHandler, true);
//       window.removeEventListener("click", this.onClickHandler, true);
//       window.removeEventListener("mousemove", this.onMouseMove, true);
//       window.cancelAnimationFrame(this.reqId);
//     }
//   }
// }
