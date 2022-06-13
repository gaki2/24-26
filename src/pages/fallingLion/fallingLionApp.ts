import Lion from "../../Characters/lion";
import { normalDistribution, lengthToRadian } from "../../utils";
import Message from "./Message";

const GRAVITY = 2.5;

export default class FallingLionApp {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  lionNums: number;
  maxRotate: number;
  minRotate: number;
  lions: Lion[];
  stageWidth: number;
  stageHeight: number;
  resizeHandler: () => void;
  requestAnimationId: number;
  fixedX: number;
  fixedY: number;
  isMouseDown: boolean;
  targetDegree: number;
  moveToZero: number;
  rotate: number;
  diff: number;
  onDownHandler: (e: MouseEvent) => void;
  onUpHandler: (e: MouseEvent) => void;
  onMoveHandler: (e: MouseEvent) => void;
  scale: number;
  message: any;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.canvas.style.backgroundColor = "#2596be";
    this.canvas.style.cursor = "pointer";
    this.message = Message;
    this.ctx = this.canvas.getContext("2d");
    this.lionNums = 75;
    this.maxRotate = 30;
    this.minRotate = -30;
    this.rotate = 0;
    this.targetDegree = 0;
    this.moveToZero = 0;
    this.diff = 0;
    this.lions = [];
    this.scale = 0.6;
    this.resize();
    this.createLions();
  }

  init() {
    this.resizeHandler = this.resize.bind(this);
    this.onDownHandler = this.onDown.bind(this);
    this.onUpHandler = this.onUp.bind(this);
    this.onMoveHandler = this.onMove.bind(this);
    window.addEventListener("resize", this.resizeHandler, false);
    window.addEventListener("mousedown", this.onDownHandler, false);
    window.addEventListener("mousemove", this.onMoveHandler, false);
    window.addEventListener("mouseup", this.onUpHandler, false);
    this.resize();
    this.display();
  }

  resize() {
    this.stageWidth = document.body.clientWidth;
    this.stageHeight = document.body.clientHeight;
    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
    this.scale = 0.3 + this.stageWidth * 0.00019;
    console.log(this.scale);
  }

  onDown(e: MouseEvent) {
    e.preventDefault();
    this.fixedX = e.clientX;
    this.fixedY = e.clientY;
    this.isMouseDown = true;
  }

  onMove(e: MouseEvent) {
    e.preventDefault();
    if (this.isMouseDown) {
      const nowX = e.clientX;
      this.targetDegree = lengthToRadian(this.stageWidth, this.fixedX, nowX, this.maxRotate);
      this.moveToZero = 0;
    }
  }

  onUp(e: MouseEvent) {
    this.isMouseDown = false;
  }

  calRotate(nowRotate: number, diff: number) {
    const newRotate = nowRotate + diff;
    let rotate = 0;

    if ((newRotate > 0 && nowRotate < 0) || (newRotate < 0 && nowRotate > 0)) {
      rotate = 0;
    } else {
      rotate = newRotate;
    }
    return rotate;
  }

  attachTo($parent: HTMLElement) {
    this.init();
    $parent.appendChild(this.canvas);
    this.message.attachTo($parent);
  }

  removeEvent() {
    window.removeEventListener("resize", this.resizeHandler, false);
    window.removeEventListener("mousedown", this.onDownHandler, false);
    window.removeEventListener("mousemove", this.onMoveHandler, false);
    window.removeEventListener("mouseup", this.onUpHandler, false);
    window.cancelAnimationFrame(this.requestAnimationId);
  }

  removeFrom($parent: HTMLElement) {
    this.removeEvent();
    $parent.removeChild(this.canvas);
    this.message.removeFrom($parent);
  }

  createLion() {
    const randomScale = normalDistribution(this.scale, 0.1); // 평균 scale: 0.55, 표준편차 0.1
    const randomX = -400 + Math.random() * (this.stageWidth + 800) * (1 / randomScale);
    const randomY = (-1600 + Math.random() * 1600) * (1 / randomScale);
    const lion = new Lion({ x: randomX, y: randomY });
    lion.changeScale(randomScale);
    return lion;
  }

  createLions() {
    for (let i = this.lions.length; i < this.lionNums; i += 1) {
      this.lions.push(this.createLion());
    }
  }

  display() {
    // 라이언들중에 화면상에 존재하는 라이언들만 필터로 걸러냄. / 화면에서 아웃된 라이언들은 버림.

    this.lions = this.lions.filter((lion) => lion.getPos().y < (this.stageHeight + 100) * (1 / lion.getScale()));
    this.createLions();
    // scale 이 작은 라이언일 수록 라이언 배열상의 앞쪽에 위치시켜, 먼저 렌더링되도록함.
    this.lions.sort((a, b) => a.getScale() - b.getScale());

    this.ctx?.clearRect(0, 0, this.stageWidth, this.stageHeight);

    const interval = this.moveToZero > 55 ? 90 : 2;
    this.diff = (this.targetDegree - this.rotate) / interval;
    this.rotate = this.calRotate(this.rotate, this.diff);

    if (this.rotate !== 0 && this.diff < 0.5 && this.diff > -0.5) {
      this.moveToZero += 1;
    }
    if (this.moveToZero > 55) {
      this.targetDegree /= 7.5;
    }

    for (let i = 0; i < this.lions.length; i += 1) {
      const nowLion = this.lions[i];
      const nowPos = nowLion.getPos();

      nowLion.setRotate(this.rotate);
      nowLion.setY(nowPos.y + GRAVITY * (1 + Math.abs(Math.sin(this.rotate)) / 4));
      if (this.rotate < 0) {
        nowLion.setX(nowPos.x + (1 + this.rotate ** 2 / 30));
      } else if (this.rotate > 0) {
        nowLion.setX(nowPos.x - (1 + this.rotate ** 2 / 30));
      }
      nowLion.draw(this.ctx!);
    }
    this.requestAnimationId = window.requestAnimationFrame(this.display.bind(this));
  }
}
