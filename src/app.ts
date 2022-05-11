// path : [fallingLion, pixelize, buzz]
import "../style.css";
import "../image/fallingLion.png";
import "../image/pixelize.png";
import "../image/spark.png";
import * as Router from "./Route";
import DashBoard from "./pages/dashboard/DashBoard";
import NotFound from "./pages/notfound/NotFound";
import SlideEffect from "./pages/slideEffect/slideEffect";

const dashBoard = new DashBoard(document.body as HTMLBodyElement);
const notFound = new NotFound(document.body as HTMLBodyElement);

const routes = [{ path: "/", component: dashBoard }];

const render = async (path: any) => {
  try {
    const component = routes.find((route) => route.path === path)?.component || notFound;
    component.render();
  } catch (err) {
    console.log(err);
  }
};

render("/");
// const slider = new SlideEffect(document.body);
// slider.toRight();
