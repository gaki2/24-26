import Ball from "./ball";
import Ripple from "./ripple";
import { distance } from "../../utils";
import Lion from "../../Characters/lion";
import Apeach from "../../Characters/apeach";
import Tube from "../../Characters/tube";

export default class Canvas {
  canvas: HTMLCanvasElement | null;
  stageWidth: number;
  stageHeight: number;
  resize: () => void;
  resizeHandler: () => void;
  ctx: CanvasRenderingContext2D | null;
  reqId: number;
  ball: Ball;
  ripple: Ripple;
  onClick: (e: MouseEvent) => void;
  onClickHandler: (e: MouseEvent) => void;
  rippleStart: boolean;
  colors: string[];
  colorIdx: number;
  lion: Lion;
  apeach: Apeach;
  tube: Tube;

  init() {
    this.colors = ["#ffffff", "#222222", "#ff0024"];
    this.colorIdx = -1;
    this.canvas = document.getElementById("canvas") as HTMLCanvasElement;
    this.ctx = this.canvas.getContext("2d");
    this.ball = new Ball(50, 50);
    this.ripple = new Ripple();
    this.rippleStart = false;
    this.resize = function () {
      this.stageWidth = window.innerWidth;
      this.stageHeight = window.innerHeight;
      this.canvas!.width = this.stageWidth;
      this.canvas!.height = this.stageHeight;
      this.ball.resize(this.stageWidth, this.stageHeight);
      this.ripple.resize(this.stageWidth, this.stageHeight);
    };
    this.resizeHandler = this.resize.bind(this);
    this.resizeHandler();
    window.addEventListener("resize", this.resizeHandler, true);
    this.onClick = function (e: MouseEvent) {
      const x = e.clientX;
      const y = e.clientY;
      const d = distance(x, y, this.ball.x, this.ball.y);
      if (d < this.ball.r * 3) {
        this.colorIdx += 1;
        this.ripple.start(x, y);
        this.rippleStart = true;
      }
    };
    this.onClickHandler = this.onClick.bind(this);
    window.addEventListener("click", this.onClickHandler, true);
  }

  draw() {
    if (!this.canvas) {
      this.init();
    }
    this.ctx?.clearRect(0, 0, this.stageWidth, this.stageHeight);
    if (this.rippleStart) {
      this.ripple.draw(this.ctx!, this.canvas!, this.colors[this.colorIdx]);
    }
    this.ball.draw(this.ctx!);

    this.reqId = window.requestAnimationFrame(this.draw.bind(this));
  }

  delete() {
    if (this.canvas) {
      this.ctx?.clearRect(0, 0, this.stageWidth, this.stageHeight);
      this.canvas = null;
      window.removeEventListener("resize", this.resizeHandler, true);
      window.removeEventListener("click", this.onClickHandler, true);
      window.cancelAnimationFrame(this.reqId);
    }
  }
}
