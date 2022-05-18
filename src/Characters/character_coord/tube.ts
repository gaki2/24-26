import { COLOR } from "../color/color";
import { PI2 } from "../../util/constant";

export function drawHead(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.strokeStyle = COLOR.BLACK;
  ctx.fillStyle = COLOR.WHITE;
  ctx.moveTo(0, -100);
  const x = 99;
  ctx.bezierCurveTo(70, -100, x, -55, x, -20);
  ctx.bezierCurveTo(x, 40, 70, 75, 0, 75);
  ctx.bezierCurveTo(-70, 75, -x, 40, -x, -20);
  ctx.bezierCurveTo(-x, -55, -70, -100, 0, -100);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}

export function drawEye(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.fillStyle = COLOR.BLACK;
  const x = 42;
  ctx.arc(x, -28, 5, 0, PI2);
  ctx.arc(-x, -28, 5, 0, PI2);
  ctx.fill();
  ctx.closePath();
}

export function drawEyeBrow(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.fillStyle = COLOR.BLACK;
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  const x = 59;
  ctx.moveTo(28, -52);
  ctx.quadraticCurveTo((59 + 28) / 2, -60, x, -52);
  ctx.stroke();
  ctx.closePath();
  ctx.beginPath();
  ctx.moveTo(-28, -52);
  ctx.quadraticCurveTo(-(59 + 28) / 2, -60, -x, -52);
  ctx.stroke();
  ctx.closePath();
}

export function drawMouse(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.strokeStyle = COLOR.BLACK;
  ctx.lineWidth = 3;
  ctx.fillStyle = COLOR.YELLOW;
  ctx.moveTo(55, 25);
  ctx.bezierCurveTo(50, 43, -100, 40, -100, 20);

  ctx.bezierCurveTo(-100, 0, -70, 5, -85, 5);
  ctx.bezierCurveTo(-85, 3, -40, 10, -40, 5);
  ctx.bezierCurveTo(-40, -35, 40, -30, 33, 5);
  ctx.bezierCurveTo(80, -15, 86, 20, 86, 35);
  ctx.bezierCurveTo(80, 80, -90, 80, -90, 30);
  ctx.fill();
  ctx.stroke();
  ctx.closePath();
}
export function drawNose(ctx: CanvasRenderingContext2D) {
  ctx.beginPath();
  ctx.fillStyle = COLOR.BLACK;

  ctx.arc(-15, -4, 4, 0, PI2);
  ctx.arc(10, -4, 4, 0, PI2);
  ctx.fill();
  ctx.closePath();
}
