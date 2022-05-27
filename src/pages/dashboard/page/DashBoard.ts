// import Canvas from "../canvas";
import CanvasBackground from "../components/CanvasBackground";
import createImageAnchors from "../components/ImageAnchors";
import CustomComponent from "../../../customComponent/CustomComponent";

export default class DashBoard {
  $parent: HTMLBodyElement;
  canvas: CanvasBackground;
  imageAnchors: HTMLElement;
  routingHandler: (e: MouseEvent) => void;
  imageAnchorsWrapper: any[];
  routeEvent: any;

  constructor(routeEvent: any) {
    this.canvas = new CanvasBackground();
    this.imageAnchors = createImageAnchors();
    this.routeEvent = routeEvent;
  }

  init() {
    this.routingHandler = this.routing.bind(this);
    window.addEventListener("click", this.routingHandler, false);
  }

  routing(e: MouseEvent) {
    const paths = ["fallingLion", "pixelize", "spark"];
    const target = e.target as HTMLElement;
    for (let i = 0; i < paths.length; i += 1) {
      if (target.className.includes(paths[i])) {
        history.pushState({}, "title", `${paths[i]}`);
        this.routeEvent();
        break;
      }
    }
  }

  attachTo($parent: HTMLElement) {
    this.init();
    // 먼저 캔버스를 랜더링 한 뒤 이미지 앵커를 랜더링해야 캔버스가 화면에 보여짐.
    this.canvas.init();
    if (this.canvas.getBallNums() === 0) {
      setTimeout(() => this.canvas.createBall(), 3000);
    }
    this.canvas.attachTo($parent);
    this.canvas.display();
    $parent.appendChild(this.imageAnchors);
  }

  removeFrom($parent: HTMLElement) {
    if (this.canvas) {
      this.canvas.removeEvent();
    }
    this.canvas.removeAllBalls();
    this.canvas.detachFrom($parent);
    CustomComponent.detach($parent, this.imageAnchors);
    window.removeEventListener("click", this.routingHandler, false);
  }
}
