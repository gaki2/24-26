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

class App {
  routes: any[];
  path: null | string;
  component: any;
  slide: SlideEffect;

  constructor() {
    this.path = "/";
    this.routes = [
      { path: "/", component: new DashBoard(this.potentialMatch.bind(this)) },
      { path: "/pixelize", component: new PixelizeCharacter() },
      { path: "/fallingLion", component: new FallingLionApp() },
    ];
    this.component = null;
    console.log("새로고침이나 시작");
    this.potentialMatch();
    // 뒤로가기 버튼이나 앞으로 가기 버튼 눌렀을 때 popstate 이벤트가 발생하며, 이때 url 에 맞춰서 화면을 랜더링하는 potentialmatch 함수를 실행함
    window.addEventListener("popstate", () => {
      this.potentialMatch();
    });
  }

  potentialMatch() {
    this.path = location.pathname;
    if (this.component) {
      this.component.removeFrom(document.body);
    }
    this.component = this.routes.find((route) => route.path === this.path)?.component;
    if (this.component) {
      this.component.attachTo(document.body);
    }
  }
}

const app = new App();

// const slider = new SlideEffect(document.body);
// slider.toRight();
// slider.animationEnd();
