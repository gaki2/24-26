import Apeach from "../../Characters/apeach";
import Lion from "../../Characters/lion";
import Tube from "../../Characters/tube";
import Ripple from "./ripple";
import SideButton from "./SideButton";
import { randomIdx } from "../../utils";

const BackgroundColor = ["#2596be", "#FE7B7B", "#7BFEC9"];

export default class PixelizeCharacter {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  stageWidth: number;
  stageHeight: number;
  resizeHandler: () => void;
  Lion: Lion;
  Apeach: Apeach;
  Tube: Tube;
  requestId: number;
  ripple: Ripple;
  rippleStart: boolean;
  nowCharacter: Lion | Apeach | Tube;
  characters: (Lion | Apeach | Tube)[];
  backGroundColor: string;
  clickHandler: (e: MouseEvent) => void;
  characterIdx: number;

  constructor() {
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    // 캐릭터 객체들을 생성함
    [this.characters, this.nowCharacter, this.backGroundColor, this.characterIdx] = this.initCharacters();
    // Ripple 을 생성함
    this.ripple = new Ripple(this.stageWidth, this.stageHeight);
    this.rippleStart = false;
    this.resize();
    this.resizeHandler = this.resize.bind(this);
    this.clickHandler = this.onClick.bind(this);
    window.addEventListener("resize", this.resizeHandler, false);
    window.addEventListener("click", this.clickHandler, false);
  }

  onClick(e: MouseEvent) {
    const clickedElem = (e.target as Element).className;
    switch (clickedElem) {
      case "pixelize_image":
        if (this.rippleStart) {
          this.ripple.reverse();
        } else {
          this.ripple.reset();
          this.ripple.pixelize();
        }
        this.rippleStart = true;
        break;
      case "zoom_in_image":
        this.nowCharacter.increaseScale(1);
        this.rippleStart = false;
        this.ripple.reset();
        this.ripple.pixelize();
        break;
      case "zoom_out_image":
        this.nowCharacter.decreaseScale(1);
        this.rippleStart = false;
        this.ripple.reset();
        this.ripple.pixelize();
        break;
      case "change_image":
        this.characterIdx += 1;
        this.characterIdx %= this.characters.length;
        this.nowCharacter = this.characters[this.characterIdx];
        this.backGroundColor = BackgroundColor[randomIdx(BackgroundColor.length)];
        this.rippleStart = false;
        break;

      default:
    }
  }

  // eslint-disable-next-line class-methods-use-this
  initCharacters(): [(Lion | Tube | Apeach)[], Lion | Apeach | Tube, string, number] {
    const characters = [];

    const lion = new Lion();
    lion.changeScale(2);
    characters.push(lion);
    const apeach = new Apeach();
    characters.push(apeach);
    const tube = new Tube();
    tube.changeScale(2);
    characters.push(tube);
    const idx = randomIdx(characters.length);
    const nowCharacter = characters[idx];
    const backgroundColor = BackgroundColor[randomIdx(BackgroundColor.length)];
    return [characters, nowCharacter, backgroundColor, idx];
  }

  resize() {
    this.stageWidth = window.innerWidth;
    this.stageHeight = window.innerHeight;
    this.canvas.width = this.stageWidth;
    this.canvas.height = this.stageHeight;
    // 화면이 resize 될때마다 케릭터 객체들의 위치가 화면의 가운데에 오도록 resize 이벤트를 걸었다.
    this.characters.forEach((character: Lion | Apeach | Tube) => {
      character.resize({ x: this.stageWidth / 2, y: this.stageHeight / 2 });
    });
    this.ripple.resize(this.stageWidth, this.stageHeight);
  }

  removeEvent() {
    window.removeEventListener("resize", this.resizeHandler, false);
    window.removeEventListener("click", this.clickHandler, false);
    window.cancelAnimationFrame(this.requestId);
  }

  attachTo(parentNode: HTMLElement) {
    // 사이트 메뉴버튼 엘리먼트 랜더링
    SideButton.attachTo(document.body);
    // 캔버스 랜더링
    this.display();
    parentNode.appendChild(this.canvas);
  }

  detachFrom(parentNode: HTMLElement) {
    parentNode.removeChild(this.canvas);
  }

  changeCharacter() {}

  display() {
    this.requestId = window.requestAnimationFrame(this.display.bind(this));
    this.ctx?.clearRect(0, 0, this.stageWidth, this.stageHeight);
    this.ctx!.fillStyle = this.backGroundColor;
    this.ctx?.fillRect(0, 0, this.stageWidth, this.stageHeight);

    this.nowCharacter.draw(this.ctx!);
    if (this.rippleStart) {
      this.ripple.animate(this.ctx!);
    }
  }
}
