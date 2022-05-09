import Canvas from "./canvas";

export default class DashBoard {
  $parent: HTMLBodyElement;
  canvas: Canvas | null;

  constructor($parent: HTMLBodyElement) {
    this.$parent = $parent;
    this.canvas = null;
  }

  // eslint-disable-next-line class-methods-use-this
  render() {
    this.$parent.innerHTML = this.getHtml();
    this.canvas = new Canvas();
    this.canvas.init();
    this.canvas.draw();
  }

  remove() {
    while (this.$parent.firstChild) {
      this.$parent.removeChild(this.$parent.firstChild);
    }
    if (this.canvas) {
      this.canvas.delete();
      this.canvas = null;
    }
  }

  // eslint-disable-next-line class-methods-use-this
  getHtml() {
    return `
      <canvas id="canvas"></canvas>
      <div class="wrapper">
        <ul class="arts">
          <li class="art-item">
            <div class="item item_blue">
              <img src="./fallingLion.png">
              <div class="item_content">
                <h2>추락하는 라이언</h2>
                <p>추락하는 라이언 프로젝트</p>
              </div>
            </div>
          </li>
          <li class="art-item">
            <div class="item item_yellow">
              <img src="./pixelize.png">
              <div class="item_content">
                <h2>케릭터의 분해</h2>
                <p>모자이크로 분해되는 케릭터</p>
              </div>
            </div>
          </li>
          <li class="art-item">
            <div class="item item_white">
              <img src="./spark.png">
              <div class="item_content">
                <h2>스파크 버즈</h2>
                <p>스파크버즈 프로젝트</p>
              </div>
            </div>
          </li>
        </ul>
        </section>
      </div>
      `;
  }
}
