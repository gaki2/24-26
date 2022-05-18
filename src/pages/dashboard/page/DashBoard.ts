// import Canvas from "../canvas";
import CanvasBackground from "../components/CanvasBackground";
import createImageAnchors from "../components/ImageAnchors";
import CustomComponent from "../../../customComponent/CustomComponent";

export default class DashBoard {
  $parent: HTMLBodyElement;
  canvas: CanvasBackground;
  imageAnchors: HTMLElement;
  constructor() {
    this.canvas = new CanvasBackground();
    this.imageAnchors = createImageAnchors();
  }

  attachTo($parent: HTMLElement) {
    // 먼저 캔버스를 랜더링 한 뒤 이미지 앵커를 랜더링해야 캔버스가 화면에 보여짐.

    this.canvas.createBall();
    this.canvas.attachTo($parent);
    this.canvas.display();
    $parent.appendChild(this.imageAnchors);
  }

  removeFrom($parent: HTMLElement) {
    if (this.canvas) {
      this.canvas.removeEvent();
    }
    this.canvas.detachFrom($parent);
    CustomComponent.detach($parent, this.imageAnchors);
  }
}
