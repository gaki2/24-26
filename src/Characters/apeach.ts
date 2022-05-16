import Character from "./character";
import * as Type from "../type/characterType";
import * as Drawing from "../character_coord/apeach";

export default class Apeach extends Character {
  name: Type.Name;

  constructor(center: Type.Center) {
    super(center);
    this.name = "apeach";
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.lineWidth = 3;
    ctx.translate(this.center.x, this.center.y);
    ctx.scale(this.scale, this.scale);
    Drawing.drawHead(ctx);
    Drawing.drawEyes(ctx);
    Drawing.drawBall(ctx);
    Drawing.drawMouse(ctx);
    Drawing.drawTeeth(ctx);
    ctx.restore();
  }
}
