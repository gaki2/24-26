import Character from "./character";
import * as Type from "./type/characterType";
import * as Drawing from "./character_coord/lion";

export default class Lion extends Character {
  name: Type.Name;
  expression: Type.Expression;

  constructor(center?: Type.Center) {
    super(center);
    this.name = "lion";
    this.expression = "normal";
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.lineWidth = 3;
    ctx.translate(this.center.x, this.center.y);
    ctx.scale(this.scale, this.scale);
    ctx.rotate((this.rotate * Math.PI) / 180);
    Drawing.drawArms(ctx);
    Drawing.drawLegs(ctx);
    Drawing.drawBody(ctx);
    Drawing.drawHead(ctx, this.expression);
    ctx.restore();
  }
}
