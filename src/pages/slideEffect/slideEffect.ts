export default class SlideEffect {
  $div: HTMLElement;
  constructor($parent: HTMLElement) {
    this.$div = this.init($parent);
    this.$div.addEventListener("animationend", () => {
      this.$div.classList.add("hide");
      setTimeout(() => {
        this.$div.classList.remove("hide");
      }, 100);
    });
  }
  // eslint-disable-next-line class-methods-use-this
  init($parent: HTMLElement) {
    const $div = document.createElement("div");
    $div.className = "slider";
    $parent.appendChild($div);
    return $div;
  }

  removeFrom($parent: HTMLElement) {
    $parent.removeChild(this.$div);
  }

  // eslint-disable-next-line class-methods-use-this
  toRight() {
    this.$div.classList.add("page-transition-left-animation");
    setTimeout(() => {
      this.$div.classList.remove("page-transition-left-animation");
    }, 2100);
  }
}
