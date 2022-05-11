export default class SlideEffect {
  $div: any;
  constructor($parent: HTMLElement) {
    this.$div = this.init($parent);
  }
  // eslint-disable-next-line class-methods-use-this
  init($parent: HTMLElement) {
    const $div = document.createElement("div");
    $div.className = "slider";
    $parent.appendChild($div);
    return $div;
  }

  // eslint-disable-next-line class-methods-use-this
  toRight() {
    console.log(1);
    const translateToRight = [{ left: "-100vw" }, { left: "0vw" }];
    const timing = {
      duration: 1000,
      fill: "forwards",
    };
    this.$div.animate(translateToRight, timing);
  }
}
