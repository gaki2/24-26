// import { Center, ColorT, Scale } from "../type/types";
import * as Type from "./type/characterType";
import { COLOR } from "./color/color";

export default class Character {
  center: Type.Center;
  color: Type.Color;
  scale: Type.Scale;
  rotate: Type.Degree;

  constructor(center?: Type.Center) {
    this.center = center || { x: 0, y: 0 };
    this.color = COLOR;
    this.scale = 1; // default scale is 1
    this.rotate = 0;
  }

  getPos() {
    return this.center;
  }

  setX(newX: number) {
    this.center.x = newX;
  }

  setY(newY: number) {
    if (Number.isNaN(newY)) {
      console.log("newY is NaN (in character class setY method)");
    }
    this.center.y = newY;
  }

  resize(center: Type.Center) {
    this.center = center;
  }

  increaseScale(num: number) {
    this.scale += num;
    if (this.scale > 12) {
      this.scale = 12;
    }
  }

  decreaseScale(num: number) {
    this.scale -= num;
    if (this.scale < 1) {
      this.scale = 1;
    }
  }

  changeScale(scale: Type.Scale) {
    this.scale = scale;
  }

  // getter
  getScale() {
    return this.scale;
  }

  setRotate(degree: Type.Degree) {
    this.rotate = degree;
  }

  getRotate() {
    return this.rotate;
  }
}
