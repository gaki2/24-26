export default class Component {
  $parent: HTMLElement;
  htmlString: string;

  constructor(parent: null | HTMLElement = null) {
    if (parent === null) {
      this.$parent = document.body;
    }
  }

  setHtmlString(str: string) {
    this.htmlString = str;
  }

  render() {
    this.$parent.innerHTML =
      this.htmlString || `<h2 class="warning-p-tag">Error: Component.InnerHTML is undefined.<h2>`;
  }
}
