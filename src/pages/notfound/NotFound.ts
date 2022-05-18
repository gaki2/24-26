export default class NotFound {
  $parent: HTMLBodyElement;

  attachTo($parent: HTMLElement) {
    // eslint-disable-next-line no-param-reassign
    $parent.innerHTML = this.getHtml();
  }

  // eslint-disable-next-line class-methods-use-this
  remove($parent: HTMLElement) {
    while ($parent.firstChild) {
      $parent.removeChild($parent.firstChild);
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getHtml() {
    return `
       <h1>404, 요청하신 페이지를 찾을 수 없습니다.<h1>
        `;
  }
}
