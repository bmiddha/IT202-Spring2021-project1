import { BaseView } from "../baseview/baseview.js";

const hydrate = (html) => {
  class MapView extends BaseView {
    constructor() {
      super();
      this.wrapper.innerHTML = html;
    }
  }

  window.customElements.define("app-map-view", MapView);
};

export default hydrate;
