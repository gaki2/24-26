import Character from "./character";
import * as Type from "../type/characterType";
import * as Drawing from "../character_coord/tube";

export default class Tube extends Character {
  name: Type.Name;

  constructor(center: Type.Center) {
    super(center);
    this.name = "tube";
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.lineWidth = 3;
    ctx.translate(this.center.x, this.center.y);
    ctx.scale(this.scale, this.scale);
    ctx.rotate((this.rotate * Math.PI) / 180);
    ctx.beginPath();
    Drawing.drawHead(ctx);
    Drawing.drawEye(ctx);
    Drawing.drawEyeBrow(ctx);
    Drawing.drawMouse(ctx);
    Drawing.drawNose(ctx);
    ctx.closePath();
    ctx.restore();
  }
}
