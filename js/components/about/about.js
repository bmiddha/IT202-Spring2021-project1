import { BaseView } from "../baseView/baseView.js";

const hydrate = (html) => {
  class AboutView extends BaseView {
    constructor() {
      super("about");
      this.wrapper.innerHTML = html;
    }
  }

  window.customElements.define("app-about-view", AboutView);

  return AboutView;
};

export default hydrate;
