export default class SlideEffect {
  $div: HTMLElement;
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

  animationEnd() {
    this.$div.addEventListener("animationend", (e) => {
      console.log(e.type);
      console.log(e.elapsedTime);
      console.log("애니메이션 끝");
    });
  }

  // eslint-disable-next-line class-methods-use-this
  toRight() {
    this.$div.classList.add("page-transition-left-animation");
  }
}
