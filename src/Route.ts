class Router {
  #routes: any[];

  constructor() {
    this.#routes = [];
  }

  add(path: string, ViewClass: any) {
    this.#routes = [
      ...this.#routes,
      {
        path,
        ViewClass,
      },
    ];
  }

  render(nowLocation: string, $body: HTMLElement) {
    const potentialMatches = this.#routes.map((route) => ({
      route,
      isMatch: nowLocation === route.path,
    }));
    const match = potentialMatches.find((potentialMatch) => potentialMatch.isMatch);

    if (match) {
      while ($body.firstChild) {
        $body.removeChild($body.firstChild);
      }
      const nowView = new match.route.ViewClass();
    }
  }
}

export default new Router();
