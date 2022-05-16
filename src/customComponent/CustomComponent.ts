// eslint-disable-next-line no-undef
type State = Record<string, unknown>;

// 사용법
// 1. setState 를 호출한 다음에 다시 attach 를 호출해야 state 의 변경사항이 엘리먼트에 적용됨
// 2. 컴포넌트 인스턴스를 만들때 htmlString 은 인자로 필수로 넣어줘야하고, initalState 는 항상 객체 형태여야 하며 없을수도 있다.
// 3. innerHtml 은 템플릿 리터럴로 선언하면되고, ${this.stateName} 같이 변수값을 넣어주면된다.

export default class CustomComponent {
  htmlString: string;
  fragment: HTMLDivElement;
  state: State;

  constructor(htmlString: string, initalState: State = {}, fragmentClassName: string | null = null) {
    this.state = initalState;
    this.htmlString = htmlString;
    this.fragment = document.createElement("div");
    if (fragmentClassName) {
      this.fragment.className = fragmentClassName;
    }
  }

  setState(state: State) {
    Object.entries(state).forEach(([key, value]) => {
      this.state[key] = value;
    });
  }

  updateFragment() {
    this.fragment.innerHTML = "";
    this.fragment.innerHTML = this.htmlString;
  }

  attachTo(parentNode: HTMLElement) {
    this.updateFragment();
    parentNode.appendChild(this.fragment);
  }

  static createElement(elemType: keyof HTMLElementTagNameMap, classList?: string[] | string, innerText?: string) {
    const elem = document.createElement(elemType);
    if (typeof classList === "string") {
      elem.classList.add(...classList.split(" "));
    } else if (typeof classList === "object") {
      elem.classList.add(...classList);
    }
    if (innerText) {
      elem.innerText = innerText;
    }
    return elem;
  }

  static attach(parentNode: HTMLElement, childNode: HTMLElement) {
    parentNode.appendChild(childNode);
  }
}
