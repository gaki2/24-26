// path : [fallingLion, pixelize, buzz]
import "../style.css";
import "../image/fallingLion.png";
import "../image/pixelize.png";
import "../image/spark.png";
import * as Router from "./Route";
import DashBoard from "./pages/dashboard/page/DashBoard";
import NotFound from "./pages/notfound/NotFound";
import PixelizeCharacter from "./pages/pixelize/PixelizeCharacter";
import SlideEffect from "./pages/slideEffect/slideEffect";
import FallingLionApp from "./pages/fallingLion/fallingLionApp";
import Spark from "./pages/spark/Spark";

class App {
  routes: any[];
  path: null | string;
  component: any;
  slide: SlideEffect;
  container: HTMLDivElement;

  constructor() {
    this.container = document.createElement("div");
    this.container.className = "container";
    document.body.appendChild(this.container);
    this.path = "/";
    this.routes = [
      { path: "/", component: new DashBoard(this.potentialMatch.bind(this)) },
      { path: "/pixelize", component: new PixelizeCharacter() },
      { path: "/fallingLion", component: new FallingLionApp() },
      { path: "/spark", component: new Spark() },
    ];
    this.component = null;
    this.potentialMatch();
    // 뒤로가기 버튼이나 앞으로 가기 버튼 눌렀을 때 popstate 이벤트가 발생하며, 이때 url 에 맞춰서 화면을 랜더링하는 potentialmatch 함수를 실행함
    window.addEventListener("popstate", () => {
      this.potentialMatch();
    });
  }

  potentialMatch() {
    this.container.classList.add("squeeze-animation");
    setTimeout(() => {
      this.path = location.pathname;
      if (this.component) {
        this.component.removeFrom(this.container);
      }
      this.component = this.routes.find((route) => route.path === this.path)?.component;
      if (this.component) {
        this.component.attachTo(this.container);
      }
    }, 800);
    setTimeout(() => {
      this.container.classList.remove("squeeze-animation");
    }, 2030);
  }
}

const app = new App();

// const slider = new SlideEffect(this.container);
// slider.toRight();
// slider.animationEnd();
