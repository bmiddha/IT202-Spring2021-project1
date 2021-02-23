import { BaseView } from "../baseView/baseView.js";

const hydrate = (html) => {
  class HomeView extends BaseView {
    constructor() {
      super("home");
      this.wrapper.innerHTML = html;
    }
  }

  window.customElements.define("app-home-view", HomeView);

  return HomeView;
};

export default hydrate;
