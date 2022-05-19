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
const commitTest = "1";
const dashBoard = new DashBoard();
const notFound = new NotFound();
const pixelize = new PixelizeCharacter();

const routes = [
  { path: "/", component: dashBoard },
  {
    path: "/pixelize",
    component: pixelize,
  },
];

const render = async (path: any) => {
  try {
    const component = routes.find((route) => route.path === path)?.component;
    component!.attachTo(document.body);
  } catch (err) {
    console.log(err);
  }
};
render("/pixelize");

// const slider = new SlideEffect(document.body);
// slider.toRight();
// slider.animationEnd();
