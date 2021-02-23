import { BaseView } from "../baseview/baseview.js";

const hydrate = (html) => {
  class AboutView extends BaseView {
    constructor() {
      super();
      this.wrapper.innerHTML = html;
    }
  }

  window.customElements.define("app-about-view", AboutView);
};

export default hydrate;
