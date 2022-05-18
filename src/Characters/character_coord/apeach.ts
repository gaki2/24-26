import { COLOR } from "../color/color";
import { PI2 } from "../../util/constant";

export function drawHead(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  // ctx.lineJoin = "round";
  ctx.lineCap = "butt";
  ctx.fillStyle = COLOR.PINK;
  ctx.lineWidth = 10;
  ctx.moveTo(0, -200);
  ctx.bezierCurveTo(90, -200, 230, -50, 238, 40);
  ctx.bezierCurveTo(238, 110, 186, 221, 0, 221);
  ctx.bezierCurveTo(-186, 221, -238, 110, -238, 40);
  ctx.bezierCurveTo(-238, -50, -90, -200, 0, -200);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
  ctx.beginPath();
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}

export function drawEyes(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.fillStyle = COLOR.BLACK;
  ctx.arc(-65, 9, 14, 0, PI2);
  ctx.arc(65, 9, 14, 0, PI2);
  ctx.fill();
  ctx.closePath();
}

export function drawBall(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.fillStyle = COLOR.MILDPINK;
  ctx.ellipse(-135, 65, 52, 42, 0, 0, PI2);
  ctx.ellipse(135, 65, 52, 42, 0, 0, PI2);
  ctx.fill();
  ctx.closePath();
}

export function drawMouse(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.fillStyle = COLOR.RED;
  ctx.moveTo(0, 49);
  ctx.bezierCurveTo(20, 49, 30, 43, 42, 43);
  ctx.bezierCurveTo(58, 43, 62, 60, 62, 63);
  ctx.bezierCurveTo(62, 67, 60, 107, 0, 107);
  ctx.bezierCurveTo(-60, 107, -62, 67, -62, 63);
  ctx.bezierCurveTo(-62, 60, -58, 43, -42, 43);
  ctx.bezierCurveTo(-30, 43, -20, 49, 0, 49);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}

export function drawTeeth(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.lineWidth = 8;
  ctx.fillStyle = COLOR.WHITE;
  ctx.moveTo(42, 43);
  ctx.bezierCurveTo(42, 70, 0, 65, 0, 65);
  ctx.bezierCurveTo(0, 65, -42, 70, -42, 43);
  ctx.bezierCurveTo(-30, 43, -20, 49, 0, 49);
  ctx.bezierCurveTo(20, 49, 30, 43, 42, 43);
  ctx.stroke();
  ctx.fill();
  ctx.closePath();
}
