import Vector from "../../../util/vector";
import { distance } from "../../../utils";
import Tube from "../../../Characters/tube";

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
    this.r = 18;
    this.v = new Vector(3, 3);
    this.rotate = 0;
  }

  setR(r: number) {
    this.r = r;
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
    // domrect 에 충돌할때 여유값으로 3px 을 줌으로써, ball 이 rect 에 끼는 현상을 방지
    return this.r + 3;
  }

  getV() {
    return this.v;
  }

  setV(v: Vector) {
    this.v = v;
  }

  // 공의 x 축속도를 리버스함 (equal to vx *= -1)
  reverseVx() {
    const reversedVx = this.getV().multiplyX(-1);
    this.setV(reversedVx);
  }

  // 공의 y 축속도를 리버스함 (equal to vy *= -1)
  reverseVy() {
    const reversedVy = this.getV().multiplyY(-1);
    this.setV(reversedVy);
  }

  // 마우스가 공 안에 있는지 확인하는 함수
  isInsideBall(x: number, y: number) {
    const d = distance(x, y, this.pos.x, this.pos.y);
    if (d < this.r * 3) {
      return true;
    }
    return false;
  }

  draw(ctx: CanvasRenderingContext2D) {
    // 현재 공의 위치를 변화시킴
    this.pos.x += this.v.x;
    this.pos.y += this.v.y;

    // 공의 속도가 점점 느려지게 만드는 로직
    if (this.v.x >= 0) this.v.x -= (Math.abs(this.v.x) - Math.abs(1)) * REDUCE;
    else this.v.x += (Math.abs(this.v.x) - Math.abs(1)) * REDUCE;
    if (this.v.y >= 0) this.v.y -= (Math.abs(this.v.y) - Math.abs(1)) * REDUCE;
    else this.v.y += (Math.abs(this.v.y) - Math.abs(1)) * REDUCE;

    // 공 객체는 사실 tube 이므로, tube 의 위치를 현재 공의 위치에 맞게 바꿔줌
    this.ball.center.x = this.pos.x;
    this.ball.center.y = this.pos.y;

    // 공(튜브)가 움직이면서 회전하는 효과를 주기 위해 rotate 를 추가함
    this.rotate += 1.5;
    this.ball.setRotate(this.rotate);

    // (튜브) 드로우
    this.ball.draw(ctx);
  }
}
