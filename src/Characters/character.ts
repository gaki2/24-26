// import { Center, ColorT, Scale } from "../type/types";
import * as Type from "../type/characterType";
import { COLOR } from "../color/color";

export default class Character {
  center: Type.Center;
  color: Type.Color;
  scale: Type.Scale;
  rotate: Type.Degree;

  constructor(center: Type.Center) {
    this.center = center;
    this.color = COLOR;
    this.scale = 1; // default scale is 1
    this.rotate = 0;
  }

  resize(center: Type.Center) {
    this.center = center;
  }

  changeScale(scale: Type.Scale) {
    this.scale = scale;
  }

  changeRoate(degree: Type.Degree) {
    this.rotate = degree;
  }
}
