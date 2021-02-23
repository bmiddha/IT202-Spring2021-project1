import { BaseView } from "../baseview/baseview.js";

const hydrate = (html) => {
  class DataView extends BaseView {
    constructor() {
      super();
      this.wrapper.innerHTML = html;
    }
  }

  window.customElements.define("app-data-view", DataView);
};

export default hydrate;
