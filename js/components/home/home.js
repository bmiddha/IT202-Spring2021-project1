import { BaseView } from "../baseview/baseview.js";

const hydrate = (html) => {
  class HomeView extends BaseView {
    constructor() {
      super();
      this.wrapper.innerHTML = html;
    }
  }

  window.customElements.define("app-home-view", HomeView);
};

export default hydrate;
