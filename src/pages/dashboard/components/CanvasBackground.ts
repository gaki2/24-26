import Ball from "./ball";
import Ripple from "./ripple";
import { distance } from "../../../utils";
import Vector from "../../../util/vector";

export default class CanvasBackground {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  stageWidth: number;
  stageHeight: number;
  resizeHandler: () => void;
  ball: Ball;
  ripple: Ripple;
  $elems: HTMLElement[];
  DOMRectPos: DOMRect[];
  animationId: number;
  onMoveHandler: (e: MouseEvent) => void;
  balls: Ball[];
  colorIdx: number;
  backgroundColors: string[];
  rippleStart: boolean;
  onClickHandler: (e: MouseEvent) => void;

  constructor() {
    this.backgroundColors = ["#CE7082", "#f0cf61", "#167c80", "#32b67a", "#2596be"];
    this.colorIdx = -1;
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.resizeHandler = this.resize.bind(this);
    this.onMoveHandler = this.onMove.bind(this);
    this.onClickHandler = this.onClick.bind(this);
    this.ripple = new Ripple();
    this.rippleStart = false;
    this.balls = [];
    this.DOMRectPos = [];
    this.resize();
    window.addEventListener("resize", this.resizeHandler, false);
    window.addEventListener("mousemove", this.onMoveHandler, false);
    window.addEventListener("click", this.onClickHandler, false);
  }

  resize() {
    this.stageWidth = window.innerWidth;
    this.stageHeight = window.innerHeight;
    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
    this.getImageAnchorPos();
    this.ripple.resize(this.stageWidth, this.stageHeight);
  }

  // ball 을 생성하는 함수
  createBall() {
    const ball = new Ball(15 * Math.random(), 10 * Math.random());
    this.balls.push(ball);
  }

  // ball 이 화면의 DomRect 와 충돌하면, ball 의 진행방향을 바꿔주는 함수
  collide(ball: Ball) {
    if (ball.getX() - ball.getR() <= 0) {
      ball.reverseVx();
      ball.setX(ball.getR());
    } else if (ball.getX() + ball.getR() >= this.stageWidth) {
      ball.reverseVx();
      ball.setX(this.stageWidth - ball.getR());
    } else if (ball.getY() + ball.getR() >= this.stageHeight) {
      ball.reverseVy();
      ball.setY(this.stageHeight - ball.getR());
    } else if (ball.getY() - ball.getR() <= 0) {
      ball.reverseVy();
      ball.setY(ball.getR());
    }

    if (this.DOMRectPos.length > 0) {
      this.DOMRectPos.forEach((rect: any) => {
        if (
          rect.top <= ball.getY() &&
          ball.getY() <= rect.bottom &&
          distance(ball.getX(), ball.getY(), rect.left, ball.getY()) <= ball.getR()
        ) {
          ball.reverseVx();
        } else if (
          rect.top <= ball.getY() &&
          ball.getY() <= rect.bottom &&
          distance(ball.getX(), ball.getY(), rect.right, ball.getY()) <= ball.getR()
        ) {
          ball.reverseVx();
        } else if (
          rect.left <= ball.getX() &&
          ball.getX() <= rect.right &&
          distance(ball.getX(), ball.getY(), ball.getX(), rect.top) <= ball.getR()
        ) {
          ball.reverseVy();
        } else if (
          rect.left <= ball.getX() &&
          ball.getX() <= rect.right &&
          distance(ball.getX(), ball.getY(), ball.getX(), rect.bottom) <= ball.getR()
        ) {
          ball.reverseVy();
        }
      });
    }
  }

  // 이미지 링크박스들의 DomRect 위치정보를 가져온다.
  // this.DOMRectPos 에 위치 정보값을 Push 하는 함수
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

  // parentNode 에 현재 캔버스를 append 한다.
  attachTo(parentNode: HTMLElement) {
    parentNode.appendChild(this.canvas);
  }

  onClick(e: MouseEvent) {
    const x = e.clientX;
    const y = e.clientY;
    for (let i = 0; i < this.balls.length; i += 1) {
      if (this.balls[i].isInsideBall(x, y)) {
        this.colorIdx += 1;
        if (this.colorIdx >= this.backgroundColors.length) this.colorIdx = 0;
        this.ripple.start(x, y);
        this.rippleStart = true;
        this.balls[i].setX(20 + Math.random() * this.stageWidth * 0.8);
        this.balls[i].setY(
          Math.random() > 0.5
            ? 20 + Math.random() * this.stageHeight * 0.1
            : this.stageHeight - 20 - Math.random() * this.stageHeight * 0.1,
        );
        this.balls[i].setV(new Vector(-5 + Math.random() * 10, -5 + Math.random() * 10));
      }
    }
  }

  onMove(e: MouseEvent) {
    const x = e.clientX;
    const y = e.clientY;
    for (let i = 0; i < this.balls.length; i += 1) {
      if (this.balls[i].isInsideBall(x, y)) {
        document.body.style.cursor = "pointer";
      } else {
        document.body.style.cursor = "default";
      }
    }
  }

  removeEvent() {
    window.removeEventListener("resize", this.resizeHandler, false);
    window.removeEventListener("mousemove", this.onMoveHandler, false);
    window.removeEventListener("click", this.onClickHandler, false);
    window.cancelAnimationFrame(this.animationId);
  }

  detachFrom($parent: HTMLElement) {
    $parent.removeChild(this.canvas);
  }

  display() {
    this.ctx?.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.animationId = window.requestAnimationFrame(this.display.bind(this));
    if (this.ripple.finish === false && this.rippleStart === true) {
      this.ripple.draw(this.ctx!, this.canvas, this.backgroundColors[this.colorIdx]);
    }

    if (this.balls.length > 0) {
      for (let i = 0; i < this.balls.length; i += 1) {
        this.collide(this.balls[i]);
        this.balls[i].draw(this.ctx!);
      }
    }

    // 이미지 hover 시 이미지가 커지는 css 효과에서 공의 충돌을 정확하게 구현하려면, 매 프래임마다 Rect 의 위치를 계속 갱신해야함.
    this.getImageAnchorPos();
  }
}
