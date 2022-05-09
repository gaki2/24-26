export default class NotFound {
  $parent: HTMLBodyElement;

  constructor($parent: HTMLBodyElement) {
    this.$parent = $parent;
  }

  render() {
    this.$parent.innerHTML = this.getHtml();
  }

  remove() {
    while (this.$parent.firstChild) {
      this.$parent.removeChild(this.$parent.firstChild);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getHtml() {
    return `
       <h1>404, 요청하신 페이지를 찾을 수 없습니다.<h1>
        `;
  }
}
